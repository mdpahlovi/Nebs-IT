import { Response } from "express";

export interface IApiResponse<T = unknown> {
    success: boolean;
    message: string;
    data?: T;
    meta?: {
        page?: number;
        limit?: number;
        total?: number;
    };
}

export class ApiResponse {
    static success<T>(res: Response, data: T, message = "Success", statusCode = 200): Response<IApiResponse<T>> {
        return res.status(statusCode).json({
            success: true,
            message,
            data,
        });
    }

    static created<T>(res: Response, data: T, message = "Created successfully"): Response<IApiResponse<T>> {
        return this.success(res, data, message, 201);
    }

    static paginated<T>(
        res: Response,
        data: T[],
        page: number,
        limit: number,
        total: number,
        message = "Success"
    ): Response<IApiResponse<T[]>> {
        return res.status(200).json({
            success: true,
            message,
            data,
            meta: {
                page,
                limit,
                total,
            },
        });
    }
}
