import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useFieldContext } from "./form-context";

type FormTextareaProps = {
    label: React.ReactNode;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
};

export default function FormTextarea({ label, required, ...props }: FormTextareaProps) {
    const field = useFieldContext<string>();

    return (
        <div>
            <Label className="mb-2">
                {required ? <span className="text-red-500">* </span> : null}
                {label}
            </Label>
            <Textarea
                className="min-h-32 resize-none"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                {...props}
            />
            {field.state.meta.isTouched && !field.state.meta.isValid ? (
                <p className="mt-0.5 text-xs leading-none text-destructive">
                    {field.state.meta.errors.map((error) => error.message).join("\n")}
                </p>
            ) : null}
        </div>
    );
}
