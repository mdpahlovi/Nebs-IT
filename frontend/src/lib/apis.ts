import type { CreateNotice } from "@/routes/notice-board/create";

const baseUrl = import.meta.env.VITE_SERVER_URL;

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

export const fetchNotices = async () => {
    const response = await fetch(`${baseUrl}/api/v1/notices`);

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to fetch notices");
    }

    return response.json();
};
