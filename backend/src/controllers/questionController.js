import { Question } from "../models/question.model.js";
import { Session } from "../models/session.model.js";

export const addQuestion = async(req,res)=>{
    try {
        const {sessionId,questions}=req.body;
        const session = await Session.findById(sessionId);
        if(!session){
            return res.status(404).json({success:false,message:"Session not found"});
        }
        if(!questions || !Array.isArray(questions) || questions.length === 0){
            return res.status(400).json({success:false,message:"Questions are required"});
        }
        const newQuestions = await Question.insertMany(
            questions.map(q=>({
                session: sessionId,
                question: q.question,
                answer: q.answer,
            }))
        );
        session.questions.push(...newQuestions.map(q=>q._id));
        await session.save();
        return res.status(201).json({success:true,message:"Questions added successfully",questions:newQuestions});

    } catch (error) {
        console.log('Error adding questions', error);
        return res.status(500).json({success:false,message:error.message});
    }
}
export const togglePinQuestion = async(req,res)=>{
    try {
        const  questionId = req.params.id;
        if(!questionId){
            return res.status(404).json({success:false,message:"Question ID is required"});
        }
        const question = await Question.findById(questionId);
        if(!question){
            return res.status(404).json({success:false,message:"Question not found"});
        }
        question.isPinned = !question.isPinned;
        await question.save();
        return res.status(200).json({success:true,message:"Question pin status toggled successfully",question});
    } catch (error) {
        console.log('Error toggling question pin status', error);
        return res.status(500).json({success:false,message:error.message});
    }
}

export const updateQuestionNote = async(req,res)=>{
    try {
        const {note}=req.body;
        const {questionId} = req.params.id;
        if(!note || note.length === 0){
            return res.status(400).json({success:false,message:"Note is required"});
        }
        if(!questionId){
            return res.status(404).json({success:false,message:"Question ID is required"});
        }
        const question = await Question.findByIdAndUpdate(questionId,{note},{new:true});
        return res.status(200).json({success:true,message:"Question note updated successfully",question});
    } catch (error) {
        console.log('Error updating question note', error);
        return res.status(500).json({success:false,message:error.message});
    }
}