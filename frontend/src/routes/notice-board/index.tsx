import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { PaginationComp } from "@/components/ui/pagination";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Employee, NoticeType, TargetType, TargetTypeColor } from "@/constants/data";
import { fetchNotices } from "@/lib/apis";
import { capitalize } from "@/lib/utils";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronDownIcon, Eye, FilePenLine, MoreVertical, Pencil, Plus } from "lucide-react";
import { useCallback, useState } from "react";
import { type DateRange } from "react-day-picker";

export const Route = createFileRoute("/notice-board/")({
    component: RouteComponent,
});

type NoticeFilters = {
    targetType: string;
    employeeId: string;
    status: string;
    dateRange: DateRange | undefined;
};

const initialFilters: NoticeFilters = {
    targetType: "",
    employeeId: "",
    status: "",
    dateRange: undefined,
};

function RouteComponent() {
    const [page, setPage] = useState(1);
    const [open, setOpen] = useState(false);
    const [filters, setFilters] = useState<NoticeFilters>(initialFilters);

    const { data } = useQuery({
        queryKey: ["notices", page, filters.targetType, filters.employeeId, filters.status, filters.dateRange?.from, filters.dateRange?.to],
        queryFn: () =>
            fetchNotices({
                page,
                targetType: filters.targetType || undefined,
                employeeId: filters.employeeId || undefined,
                status: filters.status || undefined,
                startDate: filters.dateRange?.from,
                endDate: filters.dateRange?.to,
            }),
        placeholderData: keepPreviousData,
    });

    const updateFilter = useCallback(<K extends keyof NoticeFilters>(key: K, value: NoticeFilters[K]) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
        setPage(1);
    }, []);

    const handleDateChange = useCallback(
        (newDate: DateRange | undefined) => {
            updateFilter("dateRange", newDate);
            if (newDate?.from && newDate?.to) {
                setOpen(false);
            }
        },
        [updateFilter]
    );

    const handleResetFilters = useCallback(() => {
        setFilters(initialFilters);
        setPage(1);
    }, []);

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "Published":
                return <Badge variant="success">{status}</Badge>;
            case "Draft":
                return <Badge variant="warning">{status}</Badge>;
            case "Unpublished":
                return <Badge variant="neutral">{status}</Badge>;
            default:
                return <Badge>{status}</Badge>;
        }
    };

    return (
        <div className="flex-1 flex flex-col gap-6 p-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-6">
                {/* Header */}
                <div className="space-y-2">
                    <h3>Notice Management</h3>
                    <div className="flex items-center gap-2">
                        <h6 className="text-[#00A46E]">Active Notices: 8</h6>
                        <div className="bg-border w-px h-2" />
                        <h6 className="text-[#FFA307]">Draft Notice: 04</h6>
                    </div>
                </div>
                {/* Action Buttons */}
                <div className="flex gap-4">
                    <Button asChild>
                        <Link to="/notice-board/create">
                            <Plus className="w-4 h-4" />
                            Create Notice
                        </Link>
                    </Button>
                    <Button variant="outline">
                        <FilePenLine className="w-4 h-4" />
                        All Draft Notice
                    </Button>
                </div>
            </div>
            {/* Filters */}
            <div className="flex justify-end items-center gap-4 flex-wrap">
                <h6>Filter by:</h6>
                <Select value={filters.targetType} onValueChange={(value) => updateFilter("targetType", value)}>
                    <SelectTrigger className="w-max">
                        <SelectValue placeholder="Departments or individuals" />
                    </SelectTrigger>
                    <SelectContent>
                        {Object.entries(TargetType).map(([key, value]) => (
                            <SelectItem key={key} value={key}>
                                {value}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select value={filters.employeeId} onValueChange={(value) => updateFilter("employeeId", value)}>
                    <SelectTrigger className="w-max">
                        <SelectValue placeholder="Employee Id or Name" />
                    </SelectTrigger>
                    <SelectContent>
                        {Object.entries(Employee).map(([key, { name, position }]) => (
                            <SelectItem key={key} value={key}>
                                {name} - {position}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select value={filters.status} onValueChange={(value) => updateFilter("status", value)}>
                    <SelectTrigger className="w-max">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        {["draft", "published", "unpublished"].map((value) => (
                            <SelectItem key={value} value={value}>
                                {capitalize(value)}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button variant="accent" id="date" className="w-52 justify-between font-normal">
                            {filters.dateRange?.from && filters.dateRange?.to
                                ? `${filters.dateRange.from.toLocaleDateString()} - ${filters.dateRange.to.toLocaleDateString()}`
                                : "Published on"}
                            <ChevronDownIcon />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                        <Calendar
                            mode="range"
                            selected={filters.dateRange}
                            onSelect={handleDateChange}
                            captionLayout="dropdown"
                            numberOfMonths={2}
                        />
                    </PopoverContent>
                </Popover>
                <Button variant="secondary" onClick={handleResetFilters}>
                    Reset Filters
                </Button>
            </div>
            {/* Table */}
            {data && data.data.length ? (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                <Checkbox />
                            </TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Notice Type</TableHead>
                            <TableHead>Departments/Individual</TableHead>
                            <TableHead>Published On</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.data.map((notice) => (
                            <TableRow key={notice._id}>
                                <TableCell>
                                    <Checkbox />
                                </TableCell>
                                <TableCell>{notice.title}</TableCell>
                                <TableCell className="text-muted-foreground">
                                    {NoticeType[notice.noticeType as keyof typeof NoticeType]}
                                </TableCell>
                                <TableCell className={TargetTypeColor[notice.targetType as keyof typeof TargetTypeColor]}>
                                    {TargetType[notice.targetType as keyof typeof TargetType]}
                                </TableCell>
                                <TableCell className="text-muted-foreground">
                                    {new Date(notice.publishDate).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                    })}
                                </TableCell>
                                <TableCell>{getStatusBadge(capitalize(notice.status))}</TableCell>
                                <TableCell className="flex items-center gap-1">
                                    <button className="p-1 hover:bg-accent/5 rounded-full">
                                        <Eye className="w-4 h-4 text-muted-foreground" />
                                    </button>
                                    <button className="p-1 hover:bg-accent/5 rounded-full">
                                        <Pencil className="w-4 h-4 text-muted-foreground" />
                                    </button>
                                    {notice.status !== "draft" ? (
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <button className="p-1 hover:bg-accent/5 rounded-full">
                                                    <MoreVertical className="w-4 h-4 text-muted-foreground" />
                                                </button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent
                                                side="bottom"
                                                align="end"
                                                className="w-48 flex justify-between items-center p-4"
                                            >
                                                <Label htmlFor="status">{capitalize(notice.status)}</Label>
                                                <Switch id="status" />
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    ) : (
                                        <button className="p-1 hover:bg-accent/5 rounded-full">
                                            <MoreVertical className="w-4 h-4 text-muted-foreground" />
                                        </button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : null}
            {/* Pagination */}
            <PaginationComp page={page} total={data?.meta?.total} limit={data?.meta?.limit} onChange={setPage} />
        </div>
    );
}
