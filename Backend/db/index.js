import mongoose from "mongoose";
import {DB_NAME} from "../constants.js";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        console.log(process.env.MONGODB_URI);
        const response = await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log("MongoDB Connected...");
    } catch (error) {
        console.error("Error connecting to MongoDB\n\n", error);
        process.exit(1);
    }
};

export default connectDB;