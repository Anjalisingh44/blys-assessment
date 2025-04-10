const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const connectDb = require("../config/dbconnection");

exports.registerUser = async (req, res) => {
  const db = connectDb();
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      if (results.length > 0) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert new user into the database
      db.query(
        "INSERT INTO users (username, email, password) VALUES (?,?,?)",
        [username, email, hashedPassword],
        (err, result) => {
          if (err) return res.status(500).json({ error: err.message });

          // Successful registration
          return res.status(201).json({ message: "User registered successfully" ,user: { id: result.insertId, username, email },
            token: token, });
        }
      );
    });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

exports.loginUser = async (req, res) => {
  const db = connectDb();
  const { email, password } = req.body;

  try {
    // Check if user exists
    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const user = results[0];

      // Compare the passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "2d" }
      );

      // Return success message with user data and token
      return res.status(200).json({
        message: "Login successful",
        user: { id: user.id, username: user.username, email: user.email },
        token,
      });
    });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};
