import multer from 'multer';
import { storage } from '../lib/cloudinary.js'; // adjust path

const upload = multer({ storage });

export default upload;
// This middleware can be used in routes to handle file uploads