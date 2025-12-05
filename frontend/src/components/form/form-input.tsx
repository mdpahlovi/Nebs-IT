import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFieldContext } from "./form-context";

type FormInputProps = {
    type?: React.HTMLInputTypeAttribute;
    label: React.ReactNode;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
};

export default function FormInput({ type = "text", label, required, ...props }: FormInputProps) {
    const field = useFieldContext<string>();

    return (
        <div>
            <Label className="mb-2">
                {required ? <span className="text-red-500">* </span> : null}
                {label}
            </Label>
            <Input
                type={type}
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
