import * as React from "react";
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Link, useLocation } from "@tanstack/react-router";
import { Table as TableIcon } from "lucide-react";

const menuItems = [
    { title: "Dashboard", url: "/", icon: TableIcon },
    { title: "Employee", url: "/employee", icon: TableIcon },
    { title: "Payroll", url: "/payroll", icon: TableIcon },
    { title: "Pay Slip", url: "/pay-slip", icon: TableIcon },
    { title: "Attendance", url: "/attendance", icon: TableIcon },
    { title: "Request Center", url: "/request-center", icon: TableIcon },
    { title: "Career Database", url: "/career-database", icon: TableIcon },
    { title: "Document Manager", url: "/document-manager", icon: TableIcon },
    { title: "Notice Board", url: "/notice-board", icon: TableIcon },
    { title: "Activity Log", url: "/activity-log", icon: TableIcon },
    { title: "Exit Interview", url: "/exit-interview", icon: TableIcon },
    { title: "Profile", url: "/profile", icon: TableIcon },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const location = useLocation();

    const isActive = (url: string) => {
        if (url === "/") {
            return location.pathname === "/";
        }
        return location.pathname.startsWith(url);
    };

    return (
        <Sidebar {...props}>
            <SidebarHeader className="p-[34px]">
                <img src="/Logo.png" alt="Logo" width={160} />
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    {menuItems.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton variant={isActive(item.url) ? "selected" : "default"} asChild>
                                <Link to={item.url}>
                                    <item.icon />
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
        </Sidebar>
    );
}
