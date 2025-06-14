import express from 'express';
import { protect } from '../middlewares/authMiddleware';
import {createSession, mySessions, getSessionById, updateSession, deleteSession} from '../controllers/sessionControllers.js';


const router = express.Router();
router.use(protect);

router.post('/create-session', createSession);
router.get('/my-sessions', mySessions);
router.get('/get-session/:id', getSessionById);
router.put('/update-session/:id', updateSession);
router.delete('/delete-session/:id', deleteSession);