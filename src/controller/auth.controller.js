const UserSchema = require('../model/User.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Register API 
async function register(req, res) {
    try {
        const { username, email, password, role = "user" } = req.body;
        const isUserAlreadyExist = await UserSchema.findOne({
            $or: [
                { username },
                { email }
            ]
        });

        if (isUserAlreadyExist) {
            return res.status(409).json({ message: "User already exists" });
        }

        const hash = await bcrypt.hash(password, 10) // Hash password here with 10 rounds 
        const user = await UserSchema.create({
            username,
            password: hash, // User created with the hash password 
            email,
            role
        })

        const token = jwt.sign({
            id: user._id,
            role: user.role
        }, process.env.JWT_SECRET)

        res.cookie("token", token)

        res.status(201).json({
            message: "User has been successfully created",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        })
    }
    catch (err) {
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
}


// Login user
async function Login(req, res) {
    try {
        const { username, email, password } = req.body;
        if ((!email && !username) || !password) {
            return res.status(400).json({
                message: "Please provide your email and password"
            })
        }

        // Check if user exists
        const user = await UserSchema.findOne({
            $or: [
                { username },
                { email }
            ]
        })

        if (!user) {
            return res.status(401).json({
                message: "Invalid Credentials"
            })
        }

        // Password check 
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid Credentials"
            })
        }

        // Token Assign
        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            }, process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        )
        //Assign Token
        res.cookie("token", token)

        //Respond 
        res.status(200).json({
            message: "Login Successfull",
            token,
            user: {
                id: user._id,
                username: user.username,
                role: user.role
            }
        })
    } catch (err) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: err.message,
        })
    }
}

module.exports = { register, Login }