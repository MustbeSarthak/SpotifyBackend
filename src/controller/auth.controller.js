const UserSchema = require('../model/User.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Register API 
async function register(req,res){
    try{
    const { username, email, password, role="user"} = req.body;
    const isUserAlreadyExist = await UserSchema.findOne({
        $or: [
            {username},
            {email}
        ]
    });

    const hash = await bcrypt.hash(password, 10) // Hash password here with 10 rounds 

    if(isUserAlreadyExist){
        return res.status(409).json({message: "User already exists"});
    }

    const user = await UserSchema.create({
        username,
        password : hash, // User created with the hash password 
        email,
        role
    })

    const token = jwt.sign({
        id: user._id,
        role: user.role
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(201).json({
        message:"User has been successfully created",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        }
    })
}
catch(err){
    res.status(500).json({message: "Internal Server Error", error: err.message});
}
}

module.exports = {register}