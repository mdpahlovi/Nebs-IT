import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import { updateNoticeStatus } from "@/lib/apis";
import { capitalize } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { MoreVertical } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type ToggleStatusProps = { id: string; status: "published" | "unpublished"; refetch: () => void };

export default function ToggleStatus({ id, status, refetch }: ToggleStatusProps) {
    const [checked, setChecked] = useState(status === "published");

    const { mutate, isPending } = useMutation({
        mutationFn: () => updateNoticeStatus(id),
        onSuccess: (data) => {
            refetch();
            toast.success(data?.message || "Status updated successfully");
        },
        onError: (error: Error) => {
            toast.error(error.message || "Failed to update status");
            setChecked(status === "published");
        },
    });

    const handleToggle = (newChecked: boolean) => {
        setChecked(newChecked);
        mutate();
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="p-1 hover:bg-accent/5 rounded-full">
                    <MoreVertical className="w-4 h-4 text-muted-foreground" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom" align="end" className="w-48 flex justify-between items-center p-4">
                <Label htmlFor={`status-${id}`} className="cursor-pointer">
                    {capitalize(checked ? "published" : "unpublished")}
                </Label>
                {isPending ? (
                    <Spinner />
                ) : (
                    <Switch id={`status-${id}`} checked={checked} onCheckedChange={handleToggle} disabled={isPending} />
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
