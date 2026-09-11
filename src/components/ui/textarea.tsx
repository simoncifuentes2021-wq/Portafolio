import * as React from "react";
import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "min-h-32 w-full resize-none rounded-none border-0 border-b border-line bg-transparent px-0 py-2 font-sans text-base leading-[1.7] text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-accent",
      className,
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";
