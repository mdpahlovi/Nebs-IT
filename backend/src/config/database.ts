import mongoose from "mongoose";
import { config } from "./index";

export const connectDatabase = async (): Promise<void> => {
    try {
        const conn = await mongoose.connect(config.mongodbUri);

        console.info(`MongoDB Connected: ${conn.connection.host}`);

        // Handle connection events
        mongoose.connection.on("error", (error) => {
            console.error("MongoDB connection error:", error);
        });

        mongoose.connection.on("disconnected", () => {
            console.warn("MongoDB disconnected");
        });

        // Graceful shutdown
        process.on("SIGINT", async () => {
            await mongoose.connection.close();
            console.info("MongoDB connection closed through app termination");
            process.exit(0);
        });
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
};
