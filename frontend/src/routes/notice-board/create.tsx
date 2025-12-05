import { useAppForm } from "@/components/form/form-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Employee, NoticeType, TargetType } from "@/constants/data";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Paperclip, Upload, X } from "lucide-react";

export type TargetType = "individual" | "finance" | "sales-team" | "web-team" | "database-team" | "admin" | "hr" | "all";

export type NoticeType =
    | "warning-disciplinary"
    | "performance-improvement"
    | "appreciation-recognition"
    | "attendance-leave-issue"
    | "payroll-compensation"
    | "contract-role-update"
    | "advisory-personal-reminder";

export type NoticeStatus = "draft" | "published";

export interface IAttachment {
    fileName: string;
    fileUrl: string;
}

export interface CreateNoticeDto {
    title: string;
    body?: string;
    targetType: TargetType;
    targetEmployees: string[];
    noticeType: NoticeType;
    publishDate: string | Date;
    attachments: IAttachment[];
    status: NoticeStatus;
}

export const Route = createFileRoute("/notice-board/create")({
    component: RouteComponent,
});

function RouteComponent() {
    const form = useAppForm({
        defaultValues: {
            title: "",
            body: "",
            targetType: "individual",
            targetEmployee: "",
            noticeType: "",
            publishDate: "",
            attachments: [
                {
                    fileName: "",
                    fileUrl: "",
                },
            ],
        },
    });

    return (
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
                    <div className="grid grid-cols-3 gap-4">
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
                        <div>
                            <Label className="mb-2">
                                <span className="text-red-500">* </span>
                                Employee Name
                            </Label>
                            <Input
                                placeholder="Enter employee full name"
                                value={Employee[form.getFieldValue("targetEmployee") as keyof typeof Employee]?.name ?? ""}
                                disabled
                            />
                        </div>
                        <div>
                            <Label className="mb-2">
                                <span className="text-red-500">* </span>
                                Position
                            </Label>
                            <Select value={form.getFieldValue("targetEmployee")} disabled>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select employee department" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.entries(Employee).map(([key, { position }]) => (
                                        <SelectItem value={key}>{position}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    {/* Notice Type and Publish Date Row */}
                    <div className="grid grid-cols-2 gap-4">
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
                            name="noticeType"
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
                                        <input type="file" className="absolute inset-0" hidden />
                                    </div>
                                </div>
                                {field.state.value.length
                                    ? field.state.value.map(({ fileName }, index) => (
                                          <div key={index} className="w-max flex items-center gap-2 px-4 py-2 bg-muted rounded-full">
                                              <Paperclip className="w-4 h-4 text-muted-foreground" />
                                              <p>{fileName}</p>
                                              <button
                                                  onClick={() => field.handleChange([])}
                                                  className="p-0.5 bg-background rounded-full text-primary"
                                              >
                                                  <X className="w-4 h-4" />
                                              </button>
                                          </div>
                                      ))
                                    : null}
                            </>
                        )}
                    />
                </div>
            </div>
            {/* Footer Actions */}
            <div className="flex justify-end gap-4">
                <Button variant="accent" className="rounded-full px-8">
                    Cancel
                </Button>
                <Button variant="secondary" className="rounded-full px-8">
                    Save as Draft
                </Button>
                <Button variant="default" className="gap-2 rounded-full px-8">
                    <span>✓</span>
                    Publish Notice
                </Button>
            </div>
        </div>
    );
}
