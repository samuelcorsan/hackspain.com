import { hsControlBaseClass } from "./fieldClasses";

export type InputProps = React.ComponentPropsWithoutRef<"input">;

export const Input = function Input({
  className,
  ref,
  ...props
}: InputProps & { ref?: RefObject<HTMLInputElement | null> }) {
  return (
    <input
      className={
        className ? `${hsControlBaseClass} ${className}` : hsControlBaseClass
      }
      ref={ref}
      {...props}
    />
  );
};
