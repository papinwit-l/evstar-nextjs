import type { ReactNode } from "react";

type FormFieldProps = {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
};

/** Label, optional hint, control, then the error message. */
export function FormField({
  id,
  label,
  hint,
  error,
  required,
  children,
}: FormFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-[0.95rem] font-medium">
        {label}
        {required && <span className="text-accent-text"> *</span>}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="mt-1 text-[0.85rem] text-text-muted">
          {hint}
        </p>
      )}
      <div className="mt-2">{children}</div>
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-1.5 text-[0.85rem] text-error"
        >
          {error}
        </p>
      )}
    </div>
  );
}

export const controlClass =
  "w-full rounded-[14px] border border-border-strong bg-surface px-4 py-3 text-[1rem] text-text placeholder:text-text-subtle focus:border-accent focus:outline-none aria-[invalid=true]:border-error";
