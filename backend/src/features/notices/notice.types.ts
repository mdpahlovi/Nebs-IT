import { Document } from "mongoose";
import { z } from "zod";
import { createNoticeSchema, getNoticesQuerySchema } from "./notice.validation";

export type TargetType = "individual" | "finance" | "sales-team" | "web-team" | "database-team" | "admin" | "hr" | "all";

export type NoticeType =
    | "warning-disciplinary"
    | "performance-improvement"
    | "appreciation-recognition"
    | "attendance-leave-issue"
    | "payroll-compensation"
    | "contract-role-update"
    | "advisory-personal-reminder";

export type NoticeStatus = "draft" | "published";

export interface IAttachment {
    fileName: string;
    fileUrl: string;
}

export interface INotice extends Document {
    title: string;
    body?: string;
    targetType: TargetType;
    targetEmployees: string[];
    noticeType: NoticeType;
    publishDate: Date;
    attachments: IAttachment[];
    status: NoticeStatus;
    priority: "low" | "medium" | "high" | "urgent";
    publishedAt?: Date;
}

export type CreateNoticeDto = z.infer<typeof createNoticeSchema>["body"];

export type NoticeQueryParams = z.infer<typeof getNoticesQuerySchema>["query"];
