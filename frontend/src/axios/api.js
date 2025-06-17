
import axios from "axios"
import toast from "react-hot-toast";
const BACKEND_URL = import.meta.env.MODE === "development" ? "http://localhost:7000" : "";

export const getCurrentUser = async () => {
    try {
        const response = await axios.get(`${BACKEND_URL}/api/auth/getUser`, {
            withCredentials: true
        });
        return response;
    } catch (error) {
        console.log("Error fetching current user", error);
        
    }
}


export const signup = async ( formData ) => {
    try {
        
        const response = await axios.post(`${BACKEND_URL}/api/auth/register`, formData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        
        return response;
    } catch (error) {
        console.log("Error in register", error);
        toast.error(error.response.data.message);
        return error.response;
        
    }
}

export const login = async({email,password})=>{
    try {
        const response = await axios.post(`${BACKEND_URL}/api/auth/login`,{
            email,
            password
        },{
            withCredentials:true,
            headers:{
                'Content-type':'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.log("Error in login", error);
        toast.error(error.response.data.message);
        return error.response.data;
    }
}

export const fetchQuestions = async (formData)=>{
    try {
        
        const response = await axios.post(`${BACKEND_URL}/api/ai/generateQuestion`,{
            role:formData.role,
            numberOfQuestion:formData.numberOfQuestion,
            topics:formData.topics,
            experience:formData.experience
        },{
            withCredentials:true,
            headers:{
                'Content-Type':'application/json'
            }
        });
        if(response.data.success){
            return response;
        }
    } catch (error) {
        console.log("error in fetching question",error);
        toast.error(error.response.data.message)
        return error.response;
    }
}

export const createSession = async ({role,experience,questions,description,topics})=>{
    try {
        const response = await axios.post(`${BACKEND_URL}/api/sessions/create`,{
            role,
            experience,
            questions,
            description,
            topics
        },{
            withCredentials:true,
            headers:{
                "Content-Type":"application/json"
            }
        });
        if(response.data.success){
            return response;
        }
        
    } catch (error) {
        console.log("error in creating session",error);
        toast.error(error.response.data.message)
    }
}

export const fetchCurrentSession = async (sessionId)=>{
    try {
        const response = await axios.get(`${BACKEND_URL}/api/sessions/getSession/${sessionId}`,{
            withCredentials:true
        })
        if( response.data.success){
            return response;
        }
    } catch (error) {
        console.log("error in fetching session",error);
        toast.error(error.response.data.message)
        return error.response;
    }
}

export const generateExplanation = async (question)=>{
    try {
        const response = await axios.post(`${BACKEND_URL}/api/ai/generateExplanation`,{
            question
        },{
            withCredentials:true,
            headers:{
                "Content-Type":'application/json'
            }
        })
        return response;
    } catch (error) {
        toast.error(error.response.data.message)
        return error.response;
    }
}

export const togglePin = async (questionId)=>{
    try {
        const response = await axios.post(`${BACKEND_URL}/api/questions/${questionId}/togglePin`,{},{
            withCredentials:true
        });
        return response;
    } catch (error) {
        toast.error(error.response.data.message)
        console.log("Failed to toggle" ,error);
        return error.response;
    }
}

export const addQuestion = async ({sessionId,questions})=>{
    try {
        const response = await axios.post(`${BACKEND_URL}/api/questions/add`,{
            sessionId,
            questions
        },{
            withCredentials:true,
            headers:{
                'Content-Type':'application/json'
            }
        });
        return response;
    } catch (error) {
        console.log("failed to add questions",error);
        toast.error(error.response.data.message)
        return error.response;
    }
}
export const mySessions = async ()=>{
    try {
        const response = await axios.get(`${BACKEND_URL}/api/sessions/mySessions`,{
            withCredentials:true,
        });
        return response;
    } catch (error) {
        console.log("failed to fetch session",error);
        toast.error(error.response.data.message)
        return error.response;
    }
}

export const deleteSession = async (sessionid)=>{
    try {
        const response = await axios.delete(`${BACKEND_URL}/api/sessions/deleteSession/${sessionid}`,{
            withCredentials:true,
        })
        return response;
    } catch (error) {
        console.log("Failed to delete session",error);
        toast.error(error.response.data.message)
        return error.response;
    }
}

export const logout = async ()=>{
    try {
        const response = await axios.get(`${BACKEND_URL}/api/auth/logout`,{
            withCredentials:true,
        })
        return response.data;
    } catch (error) {
        console.log("error in logout user",error);
        //toast.error(error.response.data.message);
        return error.response;
    }
}