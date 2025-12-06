import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Toaster } from "sonner";

const RootLayout = () => (
    <>
        <SidebarProvider>
            <AppSidebar />
            <div className="flex-1 overflow-hidden">
                <AppHeader />
                <Outlet />
            </div>
        </SidebarProvider>
        <Toaster />
        <TanStackRouterDevtools />
    </>
);

export const Route = createRootRoute({ component: RootLayout });
