const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../email");

const createUser = async (req, res) => {
  const { username, email, password, address } = req.body;

  // Log incoming data to verify what the mobile client sends
  console.log("createUser called with:", req.body);

  if (!username || !email || !password || !address) {
    console.error("Missing required fields:", { username, email, password, address });
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // By default, assume no deletion is necessary
    let deleteOldUser = Promise.resolve();

    // Check if a user with the provided email already exists
    const existingUser = await User.findOne({ email });
    console.log("existingUser:", existingUser);

    if (existingUser) {
      if (!existingUser.isverified) {
        console.log("Deleting old unverified user with email:", email);
        // Delete the unverified user asynchronously
        deleteOldUser = User.deleteOne({ email });
      } else {
        return res.status(400).json({ message: "User already registered and verified." });
      }
    }

    // Run deletion (if needed) and password hashing concurrently
    const [deleteResult, hashedPassword] = await Promise.all([
      deleteOldUser,
      bcrypt.hash(password, 10)
    ]);
    console.log("Password hashed. Delete result:", deleteResult);

    // Generate a 6-digit OTP and set its expiration (2 minutes from now)
    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpiration = new Date(Date.now() + 2 * 60 * 1000);
    console.log("Generated OTP:", otp, "Expires at:", otpExpiration);

    // Create and save the new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      address,
      isverified: false,
      verificationCode: otp,
      otpExpiration,
    });

    await newUser.save();
    console.log("New user created:", newUser);

    // Send OTP email asynchronously and log the outcome
    sendEmail({
      email,
      subject: "Verify Your Email - OTP",
      userEmail: email,
      otp,
    })
      .then(() => {
        console.log("OTP email sent successfully to:", email);
      })
      .catch((err) => {
        console.error("Email sending error:", err);
      });

    res.status(201).json({
      message: "User created successfully! Please verify your email.",
      email: newUser.email,
    });
  } catch (error) {
    console.error("Error in createUser:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (!user.isverified) {
      return res.status(401).json({ message: "Please verify your email first." });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Email or password is incorrect." });
    }

    // Generate JWT Token
    const accessToken = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "5d" }
    );

    res.status(200).json({ message: "Login successful", id: user.id, role: user.role, accessToken });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const verifyEmail = async (req, res) => {
  const { otp } = req.body; // Only expect OTP in the request body, no email

  if (!otp) {
    return res.status(400).json({ message: "OTP is required." });
  }

  try {
    // Find the user who has the OTP that matches
    const user = await User.findOne({ verificationCode: otp });

    if (!user) {
      return res.status(404).json({ message: "User with this OTP not found." });
    }

    if (user.isverified) {
      return res.status(400).json({ message: "Email is already verified." });
    }

    if (!user.otpExpiration || user.otpExpiration.getTime() < Date.now()) {
      return res.status(400).json({ message: "OTP has expired. Please request a new one." });
    }

    // OTP matches, verify the email
    user.isverified = true;
    user.verificationCode = null;
    user.otpExpiration = null;
    await user.save();

    res.status(200).json({ message: "Email verified successfully. You can now log in." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


module.exports = { createUser, loginUser, verifyEmail };
