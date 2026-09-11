import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "min-h-11 w-full rounded-none border-0 border-b border-line bg-transparent px-0 py-2 font-sans text-base text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-accent",
      className,
    )}
    {...props}
  />
));
Input.displayName = "Input";
