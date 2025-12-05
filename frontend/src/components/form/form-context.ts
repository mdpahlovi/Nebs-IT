import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { lazy } from "react";

const FormInput = lazy(() => import("./form-input"));
const FormSelect = lazy(() => import("./form-select"));
const FormTextarea = lazy(() => import("./form-textarea"));
const FormSubmit = lazy(() => import("./form-submit"));

export const { fieldContext, formContext, useFormContext, useFieldContext } = createFormHookContexts();

export const { useAppForm } = createFormHook({
    fieldContext,
    formContext,
    fieldComponents: {
        FormInput,
        FormSelect,
        FormTextarea,
    },
    formComponents: {
        FormSubmit,
    },
});
