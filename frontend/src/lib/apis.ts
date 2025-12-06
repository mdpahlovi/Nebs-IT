import type { CreateNotice } from "@/routes/notice-board/create";

const baseUrl = import.meta.env.VITE_SERVER_URL;

export type PaginatedResult<T> = {
    data: T[];
    meta: { page: number; limit: number; total: number; activeCount: number; draftCount: number };
};

export const createNotice = async (data: CreateNotice) => {
    const response = await fetch(`${baseUrl}/api/v1/notices`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to create notice");
    }

    return response.json();
};

export const fetchNotices = async (query: Record<string, unknown>): Promise<PaginatedResult<{ _id: string } & CreateNotice>> => {
    const searchParams = new URLSearchParams();

    for (const key in query) {
        const value = query[key];
        if (value !== undefined && value !== null) {
            searchParams.set(key, String(value));
        }
    }

    const response = await fetch(`${baseUrl}/api/v1/notices?${searchParams.toString()}`);

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to fetch notices");
    }

    return response.json();
};

export const updateNoticeStatus = async (id: string) => {
    const response = await fetch(`${baseUrl}/api/v1/notices/${id}/toggle-status`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to update notice status");
    }

    return response.json();
};
