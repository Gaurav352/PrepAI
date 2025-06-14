import express from 'express';
import {protect} from '../middlewares/authMiddleware.js';
import {register, login, logout, getUser} from '../controllers/authControllers.js';
import upload from '../middlewares/multer.js';

const router = express.Router();
router.post('/register', register);
router.post('/login', login);
router.get('/getUser',protect,getUser);
router.get('/logout', protect, logout);

router.post('/upload-photo', upload.single('photo'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  res.status(200).json({
    message: 'Image uploaded successfully',
    url: req.file.path,
    public_id: req.file.filename,
  });
});

export default router;