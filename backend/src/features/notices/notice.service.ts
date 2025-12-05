import { PaginatedResult } from "@/types/index";
import { ApiError } from "@/utils/ApiError";
import { Notice } from "./notice.model";
import { CreateNoticeDto, INotice, NoticeQueryParams } from "./notice.types";

export class NoticeService {
    /**
     * Create a new notice
     */
    async create(data: CreateNoticeDto): Promise<INotice> {
        const charData = new Notice(data);
        await charData.save();

        return charData.toObject();
    }

    /**
     * Get all notices with filtering and pagination
     */
    async findAll(query: NoticeQueryParams): Promise<PaginatedResult<INotice>> {
        const { page = 1, limit = 6, search, targetType, employeeId, status, startDate, endDate } = query;

        // Build filter
        const filter: Record<string, unknown> = {};

        if (search) {
            filter.$text = { $search: search };
        }

        if (targetType) {
            filter.targetType = targetType;
        }

        if (employeeId) {
            filter.targetEmployees = { $in: [employeeId] };
        }

        if (status) {
            filter.status = status;
        }

        if (startDate || endDate) {
            filter.publishDate = {};
            if (startDate) {
                (filter.publishDate as Record<string, Date>).$gte = new Date(startDate);
            }
            if (endDate) {
                (filter.publishDate as Record<string, Date>).$lte = new Date(endDate);
            }
        }

        const skip = (page - 1) * limit;

        const [notices, total] = await Promise.all([
            Notice.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
            Notice.countDocuments(filter),
        ]);

        return {
            data: notices,
            page,
            limit,
            total,
        };
    }

    /**
     * Get a single notice by ID
     */
    async findById(id: string): Promise<INotice> {
        const notice = await Notice.findById(id);

        if (!notice) {
            throw ApiError.notFound("Notice not found");
        }

        return notice;
    }

    /**
     * Toggle notice status between draft and published
     */
    async toggleStatus(id: string): Promise<INotice> {
        const notice = await Notice.findById(id);

        if (!notice) {
            throw ApiError.notFound("Notice not found");
        }

        const updateData: Record<string, unknown> = {};

        switch (notice.status) {
            case "unpublished":
                updateData.status = "published";
                break;
            case "published":
                updateData.status = "unpublished";
                break;
        }

        // Set publishedAt when publishing
        if (updateData.status === "published") {
            updateData.publishedAt = new Date();
        }

        // Clear publishedAt when unpublish
        if (updateData.status === "unpublished") {
            updateData.publishedAt = null;
        }

        const updatedNotice = await Notice.findByIdAndUpdate(id, { $set: updateData }, { new: true, runValidators: true });

        if (!updatedNotice) {
            throw ApiError.notFound("Notice not found");
        }

        return updatedNotice;
    }
}

export const noticeService = new NoticeService();
