const asyncHandler = require("express-async-handler");
const Form = require("../models/form");

const adminMiddleware = (req, res, next) => {
    const user = req.user;
    if (!user || user.role !== "admin") {
        res.status(403);
        throw new Error("You do not have permission to perform admin work");
    }
    next();
};

// Create a new form (Only logged-in users)
const createForm = asyncHandler(async (req, res) => {
    if (!req.user || req.user.role !== "user") {
        return res.status(403).json({ message: "Access denied. Only users can submit forms." });
    }
    const { name, dateOfBirth, address, phone, email, courseName, paymentMethod } = req.body;

    if (!name || !dateOfBirth || !address || !phone || !email || !courseName || !paymentMethod) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await Form.findOne({ email: req.body.email });

if (existingUser) {
  return res.status(400).json({ message: "Email already registered!" });
}
  
    const form = new Form({ name, dateOfBirth, address, phone, email, courseName, paymentMethod });
    await form.save();

    res.status(201).json({ message: "Form submitted successfully", form });
});
// Get all forms
const getForms = asyncHandler(async (req, res) => {
    adminMiddleware(req, res, async () => {
        const forms = await Form.find();
        res.status(200).json(forms);
    });
});
    // Get a form by id
    const getFormById = asyncHandler(async (req, res) => {
        adminMiddleware(req, res, async () => {
            const { id } = req.params;
            console.log(id);
            const form = await Form.findById(id);
            if (!form) {
                res.status(404);
                throw new Error("Form not found");
            }
            res.status(200).json(form);
        });
    });
    
            // Update a form
            const updateForm = asyncHandler(async (req, res) => {
                adminMiddleware(req, res, async () => {
                    const form = await Form.findById(req.params.id);
                    if (!form) {
                        res.status(404);
                        throw new Error("Form not found");
                    }
                    
                    const { name, dateOfBirth, address, phone, email, courseName, paymentMethod } = req.body;
                    
                    form.name = name || form.name;
                    form.dateOfBirth = dateOfBirth || form.dateOfBirth;
                    form.address = address || form.address;
                    form.phone = phone || form.phone;
                    form.email = email || form.email;
                    form.courseName = courseName || form.courseName;
                    form.paymentMethod = paymentMethod || form.paymentMethod;
                    
                    await form.save();
                    res.status(200).json({ message: "Form updated successfully", form });
                });
            });
            
                    // Delete a form
                    const deleteForm = asyncHandler(async (req, res) => {
                        adminMiddleware(req, res, async () => {
                            const form = await Form.findById(req.params.id);
                            if (!form) {
                                res.status(404);
                                throw new Error("Form not found");
                            }
                            
                            await form.deleteOne();
                            res.status(200).json({ message: "Form deleted successfully" });
                        });
                    });
                    

                    module.exports = { createForm, getForms, getFormById, updateForm, deleteForm };