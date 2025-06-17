import mongoose from "mongoose"

export const connectDB = async ()=>{
    try {
        const response = await mongoose.connect(process.env.MONGO_URI,{});
        console.log("Database connected Successfully");
    } catch (error) {
        console.log('Error connecting database',error);
    }
}