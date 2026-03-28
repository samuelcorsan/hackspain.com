import { forwardRef } from "react";
import {
  hsButtonClass,
  type HsButtonSize,
  type HsButtonVariant,
} from "./buttonStyles";

export type ButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  variant?: HsButtonVariant;
  size?: HsButtonSize;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "gold", size = "md", className, type = "button", ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={hsButtonClass(variant, size, className)}
      {...props}
    />
  );
});

export type ButtonLinkProps = React.ComponentPropsWithoutRef<"a"> & {
  variant?: HsButtonVariant;
  size?: HsButtonSize;
};

export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  function ButtonLink({ variant = "gold", size = "md", className, ...props }, ref) {
    return (
      <a ref={ref} className={hsButtonClass(variant, size, className)} {...props} />
    );
  },
);
