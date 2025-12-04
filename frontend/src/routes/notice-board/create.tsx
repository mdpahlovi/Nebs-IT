import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { NoticeType, TargetType } from "@/constants/data";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Calendar, Paperclip, Upload, X } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/notice-board/create")({
    component: RouteComponent,
});

function RouteComponent() {
    const [uploadedFiles, setUploadedFiles] = useState(["Policy_Document.pdf"]);

    const removeFile = (fileName: string) => {
        setUploadedFiles(uploadedFiles.filter((f) => f !== fileName));
    };

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
                        <div className="space-y-2">
                            <Label>
                                <span className="text-red-500">* </span>
                                Target Department(s) or individual
                            </Label>
                            <Select defaultValue="individual">
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.entries(TargetType).map(([key, value]) => (
                                        <SelectItem key={key} value={key}>
                                            {value}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    {/* Notice Title */}
                    <div className="space-y-2">
                        <Label>
                            <span className="text-red-500">* </span>
                            Notice Title
                        </Label>
                        <Input placeholder="Write the Title of Notice" />
                    </div>
                    {/* Employee Details Row */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label>
                                <span className="text-red-500">* </span>
                                Select Employee ID
                            </Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select employee designation" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="emp1">EMP001</SelectItem>
                                    <SelectItem value="emp2">EMP002</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>
                                <span className="text-red-500">* </span>
                                Employee Name
                            </Label>
                            <Input placeholder="Enter employee full name" />
                        </div>
                        <div className="space-y-2">
                            <Label>
                                <span className="text-red-500">* </span>
                                Position
                            </Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select employee department" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="dev">Developer</SelectItem>
                                    <SelectItem value="manager">Manager</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    {/* Notice Type and Publish Date Row */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>
                                <span className="text-red-500">* </span>
                                Notice Type
                            </Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Notice Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.entries(NoticeType).map(([key, value]) => (
                                        <SelectItem key={key} value={key}>
                                            {value}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>
                                <span className="text-red-500">* </span>
                                Publish Date
                            </Label>
                            <div className="relative">
                                <Input type="date" placeholder="Select Publishing Date" className="pr-10" />
                                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                    </div>
                    {/* Notice Body */}
                    <div className="space-y-2">
                        <Label>Notice Body</Label>
                        <Textarea placeholder="Write the details about notice" className="min-h-[120px] resize-none" />
                    </div>
                    {/* Upload Attachments */}
                    <div className="space-y-2">
                        <Label>Upload Attachments (optional)</Label>
                        <div className="border border-dashed border-emerald-600 rounded-md p-5 cursor-pointer">
                            <div className="flex flex-col items-center gap-2 text-center">
                                <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center">
                                    <Upload className="w-6 h-6 text-emerald-600" />
                                </div>
                                <p>
                                    <span className="text-emerald-600">Upload</span>{" "}
                                    <span className="text-foreground">nominee profile image or drag and drop.</span>
                                    <br />
                                    Accepted File Type: jpg, png
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* Uploaded Files */}
                    {uploadedFiles.length
                        ? uploadedFiles.map((file) => (
                              <div key={file} className="w-max flex items-center gap-2 px-4 py-2 bg-muted rounded-full">
                                  <Paperclip className="w-4 h-4 text-muted-foreground" />
                                  <p>{file}</p>
                                  <button onClick={() => removeFile(file)} className="p-0.5 bg-background rounded-full text-primary">
                                      <X className="w-4 h-4" />
                                  </button>
                              </div>
                          ))
                        : null}
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
