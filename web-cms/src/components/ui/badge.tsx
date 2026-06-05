import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "success" | "warning";
}

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  const getVariantClass = () => {
    switch (variant) {
      case "secondary":
        return "bg-secondary text-secondary-foreground";
      case "destructive":
        return "bg-destructive/10 text-destructive border-transparent";
      case "success":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-transparent";
      case "warning":
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-transparent";
      case "outline":
        return "text-foreground border border-border";
      default:
        return "bg-primary text-primary-foreground";
    }
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2",
        getVariantClass(),
        className
      )}
      {...props}
    />
  );
}
