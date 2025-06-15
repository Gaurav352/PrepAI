import express from "express";
import dotenv from 'dotenv';
import cors from "cors";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import sessionRoutes from "./routes/sessionRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";
import { protect } from "./middlewares/authMiddleware.js";
import { generateExplanation, generateQuestion } from "./controllers/AIController.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 7001;

// Middlewares
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods:["POST","GET","PUT","DELETE"],
    allowedHeaders:["Content-Type","Authorization"]
}));

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/questions",questionRoutes);
app.use("/api/ai/generateQuestion",protect,generateQuestion);
app.use("/api/ai/generateExplanation",protect,generateExplanation);

// Start the server
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
connectDB();