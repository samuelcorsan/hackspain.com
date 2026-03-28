import { forwardRef } from "react";
import { hsControlBaseClass } from "./fieldClasses";

export type InputProps = React.ComponentPropsWithoutRef<"input">;

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      className={className ? `${hsControlBaseClass} ${className}` : hsControlBaseClass}
      {...props}
    />
  );
});
