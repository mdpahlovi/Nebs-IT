import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

const RootLayout = () => (
    <SidebarProvider>
        <AppSidebar />
        <div className="flex-1">
            <AppHeader />
            <Outlet />
        </div>

        <TanStackRouterDevtools />
    </SidebarProvider>
);

export const Route = createRootRoute({ component: RootLayout });
