const mongoose = require("mongoose");
const {Schema} = mongoose;
const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "Enter the username"],
    },
    email: {
        type: String,
        required: [true, "Enter the email"],
        unique: [true, "Email address already taken"],
    },
    password: {
        type: String,
        required: [true, "Enter the password"],
    },
    address: {
        type: String,
        
    },
    
    role: {
        type: String,
        enum: ['user', 'admin'],  
        default: 'user',          
      },
      isverified:{
        type:Boolean,
        default:false,
      },
      otpExpiration: { type: Date, default:null },
      verificationCode: String
    
    
    
}, {
    timestamps: true,
});
   const user = mongoose.model('user', userSchema);

module.exports = user;

