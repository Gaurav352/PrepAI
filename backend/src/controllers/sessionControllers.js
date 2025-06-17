import { Session } from "../models/session.model.js";
import {Question} from "../models/question.model.js"
export const createSession = async (req, res) => {
    try {
        const {role, experience, topics, description,questions} = req.body;
        const user = req.user;
        if (!role || !experience || !topics || !description) {
            return res.status(400).json({message: "All fields are required"});
        }
        const session = await Session.create({
            user:user._id,
            role,
            experience,
            topics,
            description,
        });
        const questionsToAdd = await Promise.all(
            questions.map(async (q) => {
                const question = await Question.create({
                    session: session._id,
                    question: q.question,
                    answer: q.answer,
                    note: q.note || "",
                    isPinned: q.isPinned || false,
                });
                return question._id;
            })
        );
        session.questions = questionsToAdd;
        await session.save();
        return res.status(201).json({success: true, message: "Session created successfully", session});


    } catch (error) {
        console.log('Error creating session', error);
        return res.status(500).json({success: false, message: "Internal server error"});
    }
}
export const mySessions =async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(401).json({message: "Unauthorized"});
        }
        const sessions = await Session.find({user: user._id})
        .sort({createdAt: -1})
        .populate('questions');
        return res.status(200).json({success: true, sessions});
    } catch (error) {
        console.log('Error fetching user sessions', error);
        return res.status(500).json({success: false, message: "Internal server error"});
    }
}
export const getSession = async (req, res) => {
    try {
        const sessionId = req.params.id;
        
        if(!sessionId) {
            return res.status(400).json({message: "Session ID is required"});
        }
        const session = await Session.findById(sessionId)
        .populate({
            path: 'questions',
            options: { sort: { isPinned: -1, createdAt: -1 } }
        })
        .exec();
        if(!session) {
            return res.status(404).json({message: "Session not found"});
        }
        return res.status(200).json({success: true, session});
    } catch (error) {
        console.log('Error fetching session', error);
        return res.status(500).json({success: false, message: "Internal server error"});
    }
}
export const deleteSession = async (req, res) => {
    try {
        const sessionId = req.params.id;
        if(!sessionId) {
            return res.status(400).json({message: "Session ID is required"});
        }
        const session = await Session.findById(sessionId);
        
        if(!session) {
            return res.status(404).json({message: "Session not found"});
        }
        if(session.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({message: "You are not authorized to delete this session"});
        }
        await Question.deleteMany({session: sessionId});
        await session.deleteOne();
        return res.status(200).json({success: true, message: "Session deleted successfully"});
    } catch (error) {
        console.log('Error deleting session', error);
        return res.status(500).json({success: false, message: "Internal server error"});
    }
}