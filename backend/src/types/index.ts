export interface PaginationQuery {
    page?: number;
    limit?: number;
    sort?: string;
    order?: "asc" | "desc";
}

export interface PaginatedResult<T> {
    data: T[];
    page: number;
    limit: number;
    total: number;
}
