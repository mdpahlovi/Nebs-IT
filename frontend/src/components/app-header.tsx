import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell } from "lucide-react";

export function AppHeader() {
    return (
        <div className="bg-sidebar text-sidebar-foreground h-20 px-8 py-4 flex justify-between">
            <p className="text-foreground">
                <span className="font-medium">Good Afternoon Asif,</span>
                <br />
                13 June, 2026
            </p>
            <div className="flex items-center gap-4">
                <Bell className="w-5 h-5" />
                <div className="bg-border w-px h-5" />
                <div className="flex items-center gap-3">
                    <p className="text-foreground text-right">
                        <span className="font-medium">Asif Riaj</span>
                        <br />
                        Hr
                    </p>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </div>
    );
}
