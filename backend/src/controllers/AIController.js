import {GoogleGenAI} from "@google/genai"
import { conceptExplainPrompt } from "../lib/prompts.js"
import { questionAnswerPrompt } from "../lib/prompts.js"

const ai=new GoogleGenAI({apiKey:process.env.GOOGLE_GEMINI_API_KEY});

export const generateQuestion = async (req,res)=>{
    try {
        const {role, experience, topics,numberOfQuestion} = req.body;
        if(!role || !experience || !topics || !numberOfQuestion){
            return res.status(400).json({success:false,message:"All fields are required"});
        }
        const prompt = questionAnswerPrompt(role,experience,topics,numberOfQuestion);

        const response = await ai.models.generateContent({
            model:"gemini-2.5-flash-lite",
            contents:prompt,
        });
        let raw = response.text;
        
        const actual = raw.replace(/^```json\s*/,"").replace(/```$/,"").trim();
        const finalResponse = JSON.parse(actual);

        return res.status(201).json({
            success:true,
            message:"Generated question successfully",  
            data:finalResponse
        })

    } catch (error) {
        console.log("Failed to generate questions",error);
        return res.status(400).json({success:false,message:"Failed to generate questions"})
    }
}

export const generateExplanation = async (req,res)=>{
    try {
        const {question}=req.body;
        if(!question ){
            return res.status(404).json({
                success:false,
                message:"Question not found"
            })
        }
        const prompt = conceptExplainPrompt(question);
        const response = await ai.models.generateContent({
            model:"gemini-2.0-flash-lite",
            contents:prompt,
        })
        let raw=response.text;
        const actual = raw.replace(/^```json\s*/,"").replace(/```$/,"").trim();
        const finalResponse = JSON.parse(actual);

        return res.status(201).json({
            success:true,
            message:"Generated Explanation successfully",
            data:finalResponse
        })
    } catch (error) {
        console.log("failed to fetch explanation",error);
        res.status(400).json({message:"Failed to explain concept"});
    }
}