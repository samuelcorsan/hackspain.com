import { cloneElement, isValidElement, type ReactElement, type ReactNode } from "react";
import {
  hsHintClass,
  hsLabelBungeeClass,
  hsLabelSansClass,
} from "./fieldClasses";

type LabelVariant = "bungee" | "sans";

export type FormFieldProps = {
  id: string;
  label: ReactNode;
  hint?: ReactNode;
  required?: boolean;
  labelVariant?: LabelVariant;
  className?: string;
  children: ReactElement<{ id?: string }>;
};

export function FormField({
  id,
  label,
  hint,
  required,
  labelVariant = "bungee",
  className,
  children,
}: FormFieldProps) {
  const labelTextClass =
    labelVariant === "bungee" ? hsLabelBungeeClass : hsLabelSansClass;

  const control = isValidElement(children) ? cloneElement(children, { id }) : children;

  return (
    <div className={className}>
      <label htmlFor={id} className="flex flex-col gap-1">
        <span className={labelTextClass}>
          {label}
          {required ? " *" : null}
        </span>
        {hint != null ? <span className={hsHintClass}>{hint}</span> : null}
        {control}
      </label>
    </div>
  );
}
