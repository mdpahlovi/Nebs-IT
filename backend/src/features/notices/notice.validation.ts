import { z } from "zod";

const targetTypes = ["individual", "finance", "sales-team", "web-team", "database-team", "admin", "hr", "all"] as const;

const noticeTypes = [
    "warning-disciplinary",
    "performance-improvement",
    "appreciation-recognition",
    "attendance-leave-issue",
    "payroll-compensation",
    "contract-role-update",
    "advisory-personal-reminder",
] as const;

const attachmentSchema = z.object({
    fileName: z.string().min(1, "File name is required"),
    fileUrl: z.string().url("Invalid file URL"),
});

export const createNoticeSchema = z.object({
    body: z.object({
        title: z.string().min(1, "Title is required").max(200, "Title cannot exceed 200 characters"),
        body: z.string().max(5000, "Body cannot exceed 5000 characters").optional(),
        targetType: z.enum(targetTypes, "Invalid target type"),
        targetEmployees: z.array(z.string()),
        noticeType: z.enum(noticeTypes, "Invalid notice type"),
        publishDate: z.string().or(z.date()),
        attachments: z.array(attachmentSchema),
        status: z.enum(["draft", "published"], "Invalid status"),
        priority: z.enum(["low", "medium", "high", "urgent"]).optional(),
    }),
});

export const getNoticeSchema = z.object({
    params: z.object({
        id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid notice ID"),
    }),
});

export const getNoticesQuerySchema = z.object({
    query: z.object({
        page: z.string().transform(Number).optional(),
        limit: z.string().transform(Number).optional(),
        search: z.string().optional(),
        targetType: z.enum(targetTypes).optional(),
        status: z.enum(["draft", "published"]).optional(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
    }),
});
