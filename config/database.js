import mongoose from "mongoose";

const database = async () => {
    try {
        console.log("Starting connection to MongoDB...");

        const response = await mongoose.connect("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.5.8");

        console.log(`Connected successfully to MongoDB at: ${response.connection.host}`);
    } catch (error) {
        console.log("MongoDB connection failed");
        process.exit(1);
    }
};

export default database;
