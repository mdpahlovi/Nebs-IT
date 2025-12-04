import mongoose, { Model, Schema } from "mongoose";
import { INotice, NoticeStatus, NoticeType, TargetType } from "./notice.types";

const attachmentSchema = new Schema(
    {
        fileName: {
            type: String,
            required: true,
        },
        fileUrl: {
            type: String,
            required: true,
        },
    },
    { _id: false }
);

const noticeSchema = new Schema<INotice>(
    {
        title: {
            type: String,
            required: [true, "Notice title is required"],
            trim: true,
            maxlength: [200, "Title cannot exceed 200 characters"],
        },
        body: {
            type: String,
            trim: true,
            maxlength: [5000, "Notice body cannot exceed 5000 characters"],
        },
        targetType: {
            type: String,
            enum: {
                values: ["individual", "finance", "sales-team", "web-team", "database-team", "admin", "hr", "all"] as TargetType[],
                message: "{VALUE} is not a valid target type",
            },
            required: [true, "Target type is required"],
        },
        targetEmployees: [
            {
                type: String,
                trim: true,
            },
        ],
        noticeType: {
            type: String,
            enum: {
                values: [
                    "warning-disciplinary",
                    "performance-improvement",
                    "appreciation-recognition",
                    "attendance-leave-issue",
                    "payroll-compensation",
                    "contract-role-update",
                    "advisory-personal-reminder",
                ] as NoticeType[],
                message: "{VALUE} is not a valid notice type",
            },
            required: [true, "Notice type is required"],
        },
        publishDate: {
            type: Date,
            required: [true, "Publish date is required"],
        },
        attachments: [attachmentSchema],
        status: {
            type: String,
            enum: ["draft", "published"] as NoticeStatus[],
            default: "draft",
        },
        priority: {
            type: String,
            enum: ["low", "medium", "high", "urgent"],
            default: "medium",
        },
        publishedAt: {
            type: Date,
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

noticeSchema.index({ title: "text", body: "text" });
noticeSchema.index({ status: 1 });
noticeSchema.index({ targetType: 1 });
noticeSchema.index({ publishDate: -1 });

export const Notice: Model<INotice> = mongoose.model<INotice>("Notice", noticeSchema);
