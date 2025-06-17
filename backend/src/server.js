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
import path from "path"

dotenv.config();
const app = express();
const PORT = process.env.PORT || 7001;
const __dirname = path.resolve();

// Middlewares
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ["POST", "GET", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/ai/generateQuestion", protect, generateQuestion);
app.use("/api/ai/generateExplanation", protect, generateExplanation);

if (process.env.NODE_ENV === "production") {  // Fix typo: NODE_env → NODE_ENV
  // Serve static files from frontend dist directory
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  // Handle SPA routing by serving index.html for all non-API routes
  app.get(/^(?!\/api).*/, (req, res) => {  // Safe regex for SPA fallback
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}
// Start the server
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
connectDB();