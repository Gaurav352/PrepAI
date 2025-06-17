import express from 'express';
import {protect} from '../middlewares/authMiddleware.js';
import {register, login, logout, getUser} from '../controllers/authControllers.js';
import upload from '../middlewares/multer.js';

const router = express.Router();
router.post('/register',upload.single('profile'), register);
router.post('/login', login);
router.get('/getUser',protect,getUser);
router.get('/logout', protect, logout);



export default router;