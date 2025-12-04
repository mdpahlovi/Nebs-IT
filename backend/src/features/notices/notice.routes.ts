import { validate } from "@/middleware/validate.middleware";
import { Router } from "express";
import { noticeController } from "./notice.controller";
import { createNoticeSchema, getNoticeSchema, getNoticesQuerySchema } from "./notice.validation";

const router = Router();

router.get("/", validate(getNoticesQuerySchema), noticeController.getAll);

router.post("/", validate(createNoticeSchema), noticeController.create);

router.get("/:id", validate(getNoticeSchema), noticeController.getById);

router.patch("/:id/toggle-status", validate(getNoticeSchema), noticeController.toggleStatus);

export { router as noticeRoutes };
