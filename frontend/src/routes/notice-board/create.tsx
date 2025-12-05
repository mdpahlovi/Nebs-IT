import { useAppForm } from "@/components/form/form-context";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { Employee, NoticeType, TargetType } from "@/constants/data";
import { createNotice } from "@/lib/apis";
import { capitalize } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Check, Paperclip, Upload, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

const attachmentSchema = z.object({
    fileName: z.string("File name is required"),
    fileUrl: z.string("File URL is required"),
});

const noticeSchema = z.object({
    title: z.string().min(1, "Notice title is required").max(200, "Title must be less than 200 characters"),
    body: z.string().max(5000, "Body must be less than 5000 characters").optional(),
    targetType: z.enum(Object.keys(TargetType), "Target type is required"),
    targetEmployee: z.string().min(1, "Employee selection is required"),
    noticeType: z.enum(Object.keys(NoticeType), "Notice type is required"),
    publishDate: z.string().min(1, "Publish date is required"),
    attachments: z.array(attachmentSchema).max(2, "Maximum 2 attachments allowed"),
    status: z.enum(["draft", "published"]),
});

export type CreateNotice = z.infer<typeof noticeSchema>;

export const Route = createFileRoute("/notice-board/create")({
    component: RouteComponent,
});

function RouteComponent() {
    const queryClient = useQueryClient();
    const [noticeD, setNoticeD] = useState<CreateNotice | null>(null);

    const { mutate, isPending } = useMutation({
        mutationFn: createNotice,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notices"] });
            setNoticeD(form.state.values);
            form.reset();
        },
        onError: (error: Error) => toast.error(error.message),
    });

    const defaultValues: CreateNotice = {
        title: "",
        body: "",
        targetType: "individual",
        targetEmployee: "",
        noticeType: "",
        publishDate: "",
        attachments: [],
        status: "draft",
    };

    const form = useAppForm({
        defaultValues,
        validators: {
            onChange: noticeSchema,
        },
        onSubmit: ({ value }) => mutate(value),
    });

    return (
        <>
            <div className="bg-muted flex-1 flex flex-col gap-6 p-6">
                <div className="flex items-center gap-4">
                    <Button variant="accent" size="icon-sm" asChild>
                        <Link to="/notice-board">
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <h3>Create a Notice</h3>
                </div>
                <div className="bg-background border rounded-lg">
                    <div className="px-6 py-4">
                        <h6>Please fill in the details below</h6>
                    </div>
                    <Separator />
                    <div className="p-6 grid gap-6">
                        <div className="bg-muted rounded p-4">
                            {/* Target Department */}
                            <form.AppField
                                name="targetType"
                                children={(field) => (
                                    <field.FormSelect
                                        label="Target Department(s) or individual"
                                        options={Object.entries(TargetType).map(([value, label]) => ({ value, label }))}
                                        required
                                    />
                                )}
                            />
                        </div>
                        {/* Notice Title */}
                        <form.AppField
                            name="title"
                            children={(field) => <field.FormInput label="Notice Title" placeholder="Write the Title of Notice" required />}
                        />
                        {/* Employee Details Row */}
                        <div className="grid md:grid-cols-3 gap-4">
                            <form.AppField
                                name="targetEmployee"
                                children={(field) => (
                                    <field.FormSelect
                                        label="Select Employee ID"
                                        options={Object.entries(Employee).map(([value, { id }]) => ({ value, label: id }))}
                                        placeholder="Select employee designation"
                                        required
                                    />
                                )}
                            />
                            <form.AppField
                                name="targetEmployee"
                                children={(field) => (
                                    <div>
                                        <Label className="mb-2">
                                            <span className="text-red-500">* </span>
                                            Employee Name
                                        </Label>
                                        <Input
                                            placeholder="Enter employee full name"
                                            value={Employee[field.state.value as keyof typeof Employee]?.name ?? ""}
                                            disabled
                                        />
                                    </div>
                                )}
                            />
                            <form.AppField
                                name="targetEmployee"
                                children={(field) => (
                                    <field.FormSelect
                                        label="Position"
                                        options={Object.entries(Employee).map(([value, { position }]) => ({ value, label: position }))}
                                        placeholder="Select employee department"
                                        required
                                        disabled
                                    />
                                )}
                            />
                        </div>
                        {/* Notice Type and Publish Date Row */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <form.AppField
                                name="noticeType"
                                children={(field) => (
                                    <field.FormSelect
                                        label="Notice Type"
                                        options={Object.entries(NoticeType).map(([value, label]) => ({ value, label }))}
                                        placeholder="Select Notice Type"
                                        required
                                    />
                                )}
                            />
                            <form.AppField
                                name="publishDate"
                                children={(field) => (
                                    <field.FormInput type="date" label="Publish Date" placeholder="Select Publishing Date" required />
                                )}
                            />
                        </div>
                        {/* Notice Body */}
                        <form.AppField
                            name="body"
                            children={(field) => <field.FormTextarea label="Notice Body" placeholder="Write the details about notice" />}
                        />
                        {/* Upload Attachments */}
                        <form.AppField
                            name="attachments"
                            children={(field) => (
                                <>
                                    <div>
                                        <Label className="mb-2">Upload Attachments (optional)</Label>
                                        <div className="relative border border-dashed border-emerald-600 rounded-md p-5 cursor-pointer">
                                            <div className="flex flex-col items-center gap-2 text-center">
                                                <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center">
                                                    <Upload className="w-5 h-5 text-emerald-600" />
                                                </div>
                                                <p>
                                                    <span className="text-emerald-600">Upload</span>
                                                    <span className="text-foreground"> nominee profile image or drag and drop.</span>
                                                    <br />
                                                    Accepted File Type: jpg, png
                                                </p>
                                            </div>
                                            <input
                                                type="file"
                                                className="absolute inset-0 opacity-0 cursor-pointer"
                                                accept="image/jpg,image/jpeg,image/png"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file && field.state.value.length < 2) {
                                                        const newAttachment = {
                                                            fileName: file.name,
                                                            fileUrl: URL.createObjectURL(file),
                                                        };
                                                        field.handleChange([...field.state.value, newAttachment]);
                                                    }
                                                    e.target.value = "";
                                                }}
                                                disabled={field.state.value.length >= 2}
                                            />
                                        </div>
                                    </div>
                                    {field.state.value.length ? (
                                        <div className="flex flex-wrap gap-4">
                                            {field.state.value.map(({ fileName }, index) => (
                                                <div key={index} className="w-max flex items-center gap-2 px-4 py-2 bg-muted rounded-full">
                                                    <Paperclip className="w-4 h-4 text-muted-foreground" />
                                                    <p>{fileName}</p>
                                                    <button
                                                        onClick={() => {
                                                            const newAttachments = field.state.value.filter((_, i) => i !== index);
                                                            field.handleChange(newAttachments);
                                                        }}
                                                        className="p-0.5 bg-background rounded-full text-primary"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    ) : null}
                                </>
                            )}
                        />
                    </div>
                </div>
                {/* Footer Actions */}
                <div className="flex flex-col sm:flex-row-reverse gap-4">
                    <form.AppField
                        name="status"
                        children={(field) => (
                            <Button
                                variant="default"
                                className="rounded-full px-8"
                                onClick={() => {
                                    field.handleChange("published");
                                    form.handleSubmit();
                                }}
                                disabled={isPending}
                            >
                                {isPending ? <Spinner /> : <span>✓</span>}
                                Publish Notice
                            </Button>
                        )}
                    />
                    <form.AppField
                        name="status"
                        children={(field) => (
                            <Button
                                variant="secondary"
                                className="rounded-full px-8"
                                onClick={() => {
                                    field.handleChange("draft");
                                    form.handleSubmit();
                                }}
                                disabled={isPending}
                            >
                                {isPending ? <Spinner /> : null}
                                Save as Draft
                            </Button>
                        )}
                    />
                    <Button variant="accent" className="rounded-full px-8">
                        Cancel
                    </Button>
                </div>
            </div>
            {/* Success Modal */}
            <Dialog open={!!noticeD} onOpenChange={() => setNoticeD(null)}>
                <DialogContent>
                    <DialogHeader className="items-center">
                        <div className="w-16 h-16 rounded-full bg-emerald-500 mb-4 flex justify-center items-center">
                            <Check className="w-8 h-8 text-white" />
                        </div>
                        <DialogTitle className="text-2xl font-semibold text-center">
                            Notice {capitalize(noticeD?.status)} Successfully
                        </DialogTitle>
                        <DialogDescription className="text-center text-base">
                            Your notice "{noticeD?.title ?? ""}" has been {noticeD?.status} and is now visible to all selected departments.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-center gap-3 mt-2">
                        <Button variant="secondary" className="rounded-full px-6" asChild>
                            <Link to="/notice-board">View Notice</Link>
                        </Button>
                        <Button variant="outline" className="rounded-full px-6" onClick={() => setNoticeD(null)}>
                            + Create Another
                        </Button>
                        <Button variant="accent" className="rounded-full px-6" onClick={() => setNoticeD(null)}>
                            Close
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
