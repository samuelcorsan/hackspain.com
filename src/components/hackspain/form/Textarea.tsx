import { hsControlBaseClass } from "./fieldClasses";

export type TextareaProps = React.ComponentPropsWithoutRef<"textarea">;

export const Textarea = function Textarea({
  className,
  ref,
  ...props
}: TextareaProps & { ref?: RefObject<HTMLTextAreaElement | null> }) {
  return (
    <textarea
      className={
        className ? `${hsControlBaseClass} ${className}` : hsControlBaseClass
      }
      ref={ref}
      {...props}
    />
  );
};
