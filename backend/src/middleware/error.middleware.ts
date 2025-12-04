import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { config } from "../config";
import { ApiError } from "../utils/ApiError";

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction): void => {
    let error = err;

    // Log error
    console.error(err.message, err.stack);

    // Handle Mongoose CastError (invalid ObjectId)
    if (err instanceof mongoose.Error.CastError) {
        error = ApiError.badRequest(`Invalid ${err.path}: ${err.value}`);
    }

    // Handle Mongoose Validation Error
    if (err instanceof mongoose.Error.ValidationError) {
        const messages = Object.values(err.errors).map((e) => e.message);
        error = ApiError.badRequest("Validation Error", messages);
    }

    // Handle Mongoose Duplicate Key Error
    if (err.name === "MongoServerError" && (err as any).code === 11000) {
        const field = Object.keys((err as any).keyValue)[0];
        error = ApiError.conflict(`${field} already exists`);
    }

    // Default to ApiError if not already
    if (!(error instanceof ApiError)) {
        error = new ApiError(500, err.message || "Internal Server Error");
    }

    const apiError = error as ApiError;

    res.status(apiError.statusCode).json({
        success: false,
        message: apiError.message,
        errors: apiError.errors,
        ...(config.env === "development" && { stack: apiError.stack }),
    });
};

export const notFoundHandler = (req: Request, _res: Response, next: NextFunction): void => {
    next(ApiError.notFound(`Route ${req.originalUrl} not found`));
};
