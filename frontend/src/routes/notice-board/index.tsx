import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar, Eye, FilePenLine, MoreVertical, Pencil, Plus } from "lucide-react";

export const Route = createFileRoute("/notice-board/")({
    component: RouteComponent,
});

function RouteComponent() {
    const notices = [
        {
            id: 1,
            title: "Office closed on Friday for maintenance.",
            noticeType: "General / Company-W",
            department: "All Department",
            publishedOn: "15-Jun-2025",
            status: "Published",
            departmentColor: "text-blue-600",
        },
        {
            id: 2,
            title: "Eid a-Fitr holiday schedule.",
            noticeType: "Holiday & Event",
            department: "Finance",
            publishedOn: "15-Jun-2025",
            status: "Published",
            departmentColor: "text-emerald-600",
        },
        {
            id: 3,
            title: "Updated code of conduct policy",
            noticeType: "HR & Policy Update",
            department: "Sales Team",
            publishedOn: "15-Jun-2025",
            status: "Published",
            departmentColor: "text-orange-600",
        },
        {
            id: 4,
            title: "Payroll for October will be processed on 28th",
            noticeType: "Finance & Payroll",
            department: "Web Team",
            publishedOn: "15-Jun-2025",
            status: "Published",
            departmentColor: "text-blue-600",
            hasToggle: true,
            toggleOn: true,
        },
        {
            id: 5,
            title: "System update scheduled for 30 Oct (9:00-11:00 PM)",
            noticeType: "IT / System Maintena",
            department: "Database Team",
            publishedOn: "15-Jun-2025",
            status: "Published",
            departmentColor: "text-gray-600",
        },
        {
            id: 6,
            title: "Design team sprint review moved to Tuesday.",
            noticeType: "Department / Team",
            department: "Admin",
            publishedOn: "15-Jun-2025",
            status: "Published",
            departmentColor: "text-purple-600",
        },
        {
            id: 7,
            title: "Unauthorized absence recorded on 18 Oct 2025",
            noticeType: "Warning / Disciplinary",
            department: "Individual",
            publishedOn: "15-Jun-2025",
            status: "Unpublished",
            departmentColor: "text-cyan-600",
        },
        {
            id: 8,
            title: "Office closed today due to severe weather",
            noticeType: "Emergency / Urgent",
            department: "HR",
            publishedOn: "15-Jun-2025",
            status: "Draft",
            departmentColor: "text-red-600",
            hasToggle: true,
            toggleOn: false,
        },
    ];

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
        <div className="bg-muted flex-1 flex flex-col gap-6 p-6">
            <div className="flex justify-between items-center">
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
                <select className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Departments or individuals</option>
                </select>
                <input
                    type="text"
                    placeholder="Employee Id or Name"
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Status</option>
                </select>
                <button className="px-3 py-2 border border-gray-300 rounded-md text-sm flex items-center gap-2 hover:bg-gray-50">
                    <span>Published on</span>
                    <Calendar className="w-4 h-4" />
                </button>
                <Button variant="secondary">Reset Filters</Button>
            </div>
            {/* Table */}
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
                    {notices.map((notice) => (
                        <TableRow key={notice.id}>
                            <TableCell>
                                <Checkbox />
                            </TableCell>
                            <TableCell className="text-sm text-gray-900">{notice.title}</TableCell>
                            <TableCell className="text-sm text-gray-600">{notice.noticeType}</TableCell>
                            <TableCell>
                                <span className={`text-sm font-medium ${notice.departmentColor}`}>{notice.department}</span>
                            </TableCell>
                            <TableCell className="text-sm text-gray-600">{notice.publishedOn}</TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">{getStatusBadge(notice.status)}</div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <button className="p-1 hover:bg-gray-100 rounded">
                                        <Eye className="w-4 h-4 text-gray-600" />
                                    </button>
                                    <button className="p-1 hover:bg-gray-100 rounded">
                                        <Pencil className="w-4 h-4 text-gray-600" />
                                    </button>
                                    <button className="p-1 hover:bg-gray-100 rounded">
                                        <MoreVertical className="w-4 h-4 text-gray-600" />
                                    </button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {/* Pagination */}
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#" isActive>
                            2
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext href="#" />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}
