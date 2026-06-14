const mongoose = require('mongoose');

//User schema Model 
const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            minlength: 6
        },
        role: {
            type: String,
            enum: ["user", "artist"],
            default: "user", // Default role 
        }
    }
)

const User = mongoose.model("User", UserSchema);

module.exports = User