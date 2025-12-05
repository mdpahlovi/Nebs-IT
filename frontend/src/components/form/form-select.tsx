import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFieldContext } from "./form-context";

type FormSelectProps = {
    label: React.ReactNode;
    options: { value: string; label: string }[];
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
};

export default function FormSelect({ label, options, placeholder, required, disabled }: FormSelectProps) {
    const field = useFieldContext<string>();

    return (
        <div>
            <Label className="mb-2">
                {required ? <span className="text-red-500">* </span> : null}
                {label}
            </Label>
            <Select value={field.state.value} onValueChange={(value) => field.handleChange(value)} disabled={disabled}>
                <SelectTrigger>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {field.state.meta.isTouched && !field.state.meta.isValid ? (
                <p className="mt-0.5 text-xs leading-none text-destructive">
                    {field.state.meta.errors.map((error) => error.message).join("\n")}
                </p>
            ) : null}
        </div>
    );
}
