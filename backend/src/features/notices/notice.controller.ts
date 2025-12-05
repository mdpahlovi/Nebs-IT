import { ApiResponse } from "@/utils/ApiResponse";
import { asyncHandler } from "@/utils/asyncHandler";
import { Request, Response } from "express";
import { noticeService } from "./notice.service";
import { NoticeQueryParams } from "./notice.types";

export class NoticeController {
    /**
     * @desc    Create a new notice
     * @route   POST /api/v1/notices
     */
    create = asyncHandler(async (req: Request, res: Response): Promise<void> => {
        const notice = await noticeService.create(req.body);
        ApiResponse.created(res, notice, "Notice created successfully");
    });

    /**
     * @desc    Get all notices
     * @route   GET /api/v1/notices
     */
    getAll = asyncHandler(async (req: Request, res: Response): Promise<void> => {
        const query = req.query as unknown as NoticeQueryParams;
        const result = await noticeService.findAll(query);

        ApiResponse.paginated(res, result.data, result.page, result.limit, result.total, "Notices retrieved successfully");
    });

    /**
     * @desc    Get a single notice
     * @route   GET /api/v1/notices/:id
     */
    getById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
        const notice = await noticeService.findById(req.params.id);
        ApiResponse.success(res, notice, "Notice retrieved successfully");
    });

    /**
     * @desc    Toggle notice status between draft and published
     * @route   PATCH /api/v1/notices/:id/toggle-status
     */
    toggleStatus = asyncHandler(async (req: Request, res: Response): Promise<void> => {
        const notice = await noticeService.toggleStatus(req.params.id);

        const message = notice.status === "published" ? "Notice published successfully" : "Notice unpublished successfully";

        ApiResponse.success(res, notice, message);
    });
}

export const noticeController = new NoticeController();
