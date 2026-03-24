import mongoose from "mongoose";

export const connectToDb = async () => {
    try {
        if (mongoose.connection.readyState >= 1) return;
        await mongoose.connect(process.env.MONGO as string);
    } catch (error) {
        console.log(error);
        throw new Error(error as string)
    }
}