import { request } from "express";
import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    role:{
        type: String,
        requuired: true,
    },
    experience:{
        type: String,
        required: true,
    },
    topics:{
        type: [String],
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
    }],
},{timestamps:true});

export const Session = mongoose.model("Session", sessionSchema);