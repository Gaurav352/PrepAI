import { User } from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cloudinary } from "../lib/cloudinary.js";


const COOKIE_OPTIONS = {
    httpOnly: true,
    //secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
    maxAge: 7 * 24 * 60 * 60 * 1000
};

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const file = req.file;
        if (!email || !password || !name) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }
        const profileUrl = file?.path || "";
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            profile: profileUrl,
        })
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie("jwt", token, COOKIE_OPTIONS)
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        console.log('Error registering user', error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

export const login = async (req,res)=>{
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success: false,
                message: "User does not exist"
            });
        }
        const matchPassword = await bcrypt.compare(password, user.password);
        if(!matchPassword){
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn: '7d'});
        res.cookie("jwt",token, COOKIE_OPTIONS);
        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            name:user.name
        });
    } catch (error) {
        console.log('Error logging in user', error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

export const getUser = async (req,res)=>{
    try {
        const user = User.findById(req.user._id).select('-password');
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        return res.status(200).json({
            success: true,
            user:req.user
        });
    } catch (error) {
        console.log('Error getting user', error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

export const logout = async (req, res) => {
  try {
    // Clear the cookie (assuming your token is stored in 'token')
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // use HTTPS in prod
      sameSite: "strict",
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong during logout",
    });
  }
};


