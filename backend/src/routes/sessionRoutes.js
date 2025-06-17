import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import {createSession, mySessions, getSession, deleteSession} from '../controllers/sessionControllers.js';


const router = express.Router();
router.use(protect);

router.post('/create', createSession);
router.get('/mySessions', mySessions);
router.get('/getSession/:id', getSession);
router.delete('/deleteSession/:id', deleteSession);
export default router;