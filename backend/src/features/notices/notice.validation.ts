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
    fileName: z.string("File name is required"),
    fileUrl: z.string("File URL is required"),
});

export const createNoticeSchema = z.object({
    body: z
        .object({
            title: z.string().min(1, "Notice title is required").max(200, "Title must be less than 200 characters"),
            body: z.string().max(5000, "Body must be less than 5000 characters").optional(),
            targetType: z.enum(targetTypes, "Target type is required"),
            targetEmployee: z.string().min(1, "Employee selection is required"),
            noticeType: z.enum(noticeTypes, "Notice type is required"),
            publishDate: z.string().min(1, "Publish date is required"),
            attachments: z.array(attachmentSchema).max(2, "Maximum 2 attachments allowed"),
            status: z.enum(["draft", "published", "unpublished"]),
        })
        .transform(({ targetEmployee, ...rest }) => ({
            ...rest,
            targetEmployees: [targetEmployee],
        })),
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
        employeeId: z.string().optional(),
        status: z.enum(["draft", "published", "unpublished"]).optional(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
    }),
});
