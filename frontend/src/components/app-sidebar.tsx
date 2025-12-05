import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Link, useLocation } from "@tanstack/react-router";
import {
    Database,
    DollarSign,
    DoorOpen,
    Files,
    FileText,
    History,
    LayoutDashboard,
    Megaphone,
    MessageSquare,
    Settings,
    UserCog,
    Users,
} from "lucide-react";
import * as React from "react";

const menuItems = [
    { title: "Dashboard", url: "/", icon: LayoutDashboard },
    { title: "Employee", url: "/employee", icon: UserCog },
    { title: "Payroll", url: "/payroll", icon: DollarSign },
    { title: "Pay Slip", url: "/pay-slip", icon: FileText },
    { title: "Attendance", url: "/attendance", icon: Users },
    { title: "Request Center", url: "/request-center", icon: MessageSquare },
    { title: "Career Database", url: "/career-database", icon: Database },
    { title: "Document Manager", url: "/document-manager", icon: Files },
    { title: "Notice Board", url: "/notice-board", icon: Megaphone },
    { title: "Activity Log", url: "/activity-log", icon: History },
    { title: "Exit Interview", url: "/exit-interview", icon: DoorOpen },
    { title: "Profile", url: "/profile", icon: Settings },
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
