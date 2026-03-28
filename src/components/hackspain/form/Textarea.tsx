import { forwardRef } from "react";
import { hsControlBaseClass } from "./fieldClasses";

export type TextareaProps = React.ComponentPropsWithoutRef<"textarea">;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { className, ...props },
  ref,
) {
  return (
    <textarea
      ref={ref}
      className={className ? `${hsControlBaseClass} ${className}` : hsControlBaseClass}
      {...props}
    />
  );
});
