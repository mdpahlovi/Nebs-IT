import { Router } from "express";
import { noticeRoutes } from "@/features/notices/notice.routes";

const router = Router();

// Health check
router.get("/health", (_req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is running",
        timestamp: new Date().toISOString(),
    });
});

// API Routes
router.use("/notices", noticeRoutes);

export { router as apiRoutes };
