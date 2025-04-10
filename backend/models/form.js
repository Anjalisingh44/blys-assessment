const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
    name: { type: String, required: true },
    dateOfBirth: { type: Date, required: true }, // Changed to Date type
    address: { type: String, required: true },
    phone: { 
        type: String, 
        required: true, 
        match: [/^\d{10}$/, "Invalid phone number. Must be 10 digits."] // Ensures only numbers
    },
    email: { 
        type: String, 
        required: true, 
        
        match: [/^\S+@\S+\.\S+$/, "Invalid email format."] // Validates email
    },
    courseName: { type: String, required: true },
    paymentMethod: { 
        type: String, 
        required: true, 
        enum: ["Cash", "Cheque", "Mobile Banking"] 
    }
}, { timestamps: true });

module.exports = mongoose.model("Form", formSchema);
