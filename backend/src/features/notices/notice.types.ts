import { Document, Types } from "mongoose";

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

export interface CreateNoticeDto {
    title: string;
    body?: string;
    targetType: TargetType;
    targetEmployees: string[];
    noticeType: NoticeType;
    publishDate: string | Date;
    attachments: IAttachment[];
    status: NoticeStatus;
    priority?: "low" | "medium" | "high" | "urgent";
}

export interface NoticeQueryParams {
    page?: number;
    limit?: number;
    search?: string;
    targetType?: TargetType;
    status?: NoticeStatus;
    startDate?: string;
    endDate?: string;
}
