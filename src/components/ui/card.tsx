import * as React from "react";
import { cn } from "@/lib/utils";

export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/10 bg-white/[0.045] shadow-2xl shadow-slate-950/30 backdrop-blur-xl",
        className,
      )}
      {...props}
    />
  );
}
