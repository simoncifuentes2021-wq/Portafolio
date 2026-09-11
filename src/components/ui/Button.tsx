import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export function Button({
  className,
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "btn",
        variant === "primary" && "btn-primary",
        variant === "secondary" && "btn-secondary",
        className,
      )}
      {...props}
    />
  );
}