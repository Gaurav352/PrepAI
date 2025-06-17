import express from "express"
import { protect } from "../middlewares/authMiddleware.js";
import {togglePinQuestion,addQuestion,updateQuestionNote} from "../controllers/questionController.js";

const router = express.Router();
router.use(protect);
router.post("/add", addQuestion);
router.post("/:id/togglePin", togglePinQuestion);
router.post("/:id/updateNote", updateQuestionNote);


export default router;