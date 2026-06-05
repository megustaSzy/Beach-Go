import React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Spinner({ size = "md", className }: SpinnerProps) {
  const sizeClass = 
    size === "sm" ? "h-4 w-4" : 
    size === "lg" ? "h-8 w-8" : 
    "h-6 w-6";

  return (
    <div className="flex items-center justify-center p-2">
      <Loader2 className={cn("animate-spin text-muted-foreground", sizeClass, className)} />
    </div>
  );
}
