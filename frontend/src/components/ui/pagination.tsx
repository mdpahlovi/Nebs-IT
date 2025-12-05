import * as React from "react";
import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
    return (
        <nav
            role="navigation"
            aria-label="pagination"
            data-slot="pagination"
            className={cn("mx-auto flex w-full justify-center", className)}
            {...props}
        />
    );
}

function PaginationContent({ className, ...props }: React.ComponentProps<"ul">) {
    return <ul data-slot="pagination-content" className={cn("flex flex-row items-center gap-2", className)} {...props} />;
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
    return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkProps = {
    isActive?: boolean;
} & Pick<React.ComponentProps<typeof Button>, "size"> &
    React.ComponentProps<"a">;

function PaginationLink({ className, isActive, size = "icon", ...props }: PaginationLinkProps) {
    return (
        <a
            aria-current={isActive ? "page" : undefined}
            data-slot="pagination-link"
            data-active={isActive}
            className={cn(
                buttonVariants({
                    variant: isActive ? "secondary" : "ghost",
                    size,
                }),
                className
            )}
            {...props}
        />
    );
}

function PaginationPrevious({ className, ...props }: React.ComponentProps<typeof PaginationLink>) {
    return (
        <PaginationLink aria-label="Go to previous page" size="default" className={cn("gap-1 mr-2 px-2.5 sm:pl-2.5", className)} {...props}>
            <ChevronLeftIcon />
        </PaginationLink>
    );
}

function PaginationNext({ className, ...props }: React.ComponentProps<typeof PaginationLink>) {
    return (
        <PaginationLink aria-label="Go to next page" size="default" className={cn("gap-1 ml-2 px-2.5 sm:pr-2.5", className)} {...props}>
            <ChevronRightIcon />
        </PaginationLink>
    );
}

function PaginationEllipsis({ className, ...props }: React.ComponentProps<"span">) {
    return (
        <span aria-hidden data-slot="pagination-ellipsis" className={cn("flex size-9 items-center justify-center", className)} {...props}>
            <MoreHorizontalIcon className="size-4" />
            <span className="sr-only">More pages</span>
        </span>
    );
}

type PaginationCompProps = {
    page: number;
    total?: number;
    limit?: number;
    onChange?: (page: number) => void;
};

function PaginationComp({ page = 1, total = 0, limit = 6, onChange }: PaginationCompProps) {
    const totalPages = Math.ceil(total / limit);

    if (totalPages <= 0) return null;

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages && newPage !== page) {
            onChange?.(newPage);
        }
    };

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(page - 1);
                        }}
                        className={page === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                    <PaginationItem key={num}>
                        <PaginationLink
                            href="#"
                            isActive={num === page}
                            onClick={(e) => {
                                e.preventDefault();
                                handlePageChange(num);
                            }}
                        >
                            {num}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                <PaginationItem>
                    <PaginationNext
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(page + 1);
                        }}
                        className={page === totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}

export {
    Pagination,
    PaginationContent,
    PaginationLink,
    PaginationItem,
    PaginationPrevious,
    PaginationNext,
    PaginationEllipsis,
    PaginationComp,
};
