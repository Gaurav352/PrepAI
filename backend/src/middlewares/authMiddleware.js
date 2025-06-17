import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';

export const protect = async (req, res, next) => {
    try {
        const token = req.cookies?.jwt;
        if(!token){
            return res.status(401).json({
                message: "Not authorized, no token"
            })
        };
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({
                message: "Not authorized, token Invalid"
            });
        }
        const user = await User.findById(decoded.id).select('-password');
        req.user = user;
        next();
    } catch (error) {
        console.error('Error in auth middleware', error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}