import React from "react";
import { AlertCircle, CheckCircle, Info, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface AlertBannerProps {
  type?: "info" | "success" | "warning" | "error";
  title: string;
  description?: string;
  className?: string;
}

export function AlertBanner({
  type = "info",
  title,
  description,
  className,
}: AlertBannerProps) {
  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />;
      case "warning":
        return <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />;
      case "error":
        return <XCircle className="h-5 w-5 text-destructive" />;
      default:
        return <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />;
    }
  };

  const getStyle = () => {
    switch (type) {
      case "success":
        return "bg-emerald-500/10 border-emerald-500/20 text-emerald-950 dark:text-emerald-250";
      case "warning":
        return "bg-amber-500/10 border-amber-500/20 text-amber-950 dark:text-amber-250";
      case "error":
        return "bg-destructive/10 border-destructive/20 text-destructive";
      default:
        return "bg-blue-500/10 border-blue-500/20 text-blue-950 dark:text-blue-250";
    }
  };

  return (
    <div className={cn("flex gap-3 rounded-lg border p-4 text-sm text-left items-start", getStyle(), className)}>
      <div className="shrink-0 mt-0.5">{getIcon()}</div>
      <div>
        <h4 className="font-semibold leading-tight">{title}</h4>
        {description && <p className="mt-1 text-xs opacity-90 leading-relaxed">{description}</p>}
      </div>
    </div>
  );
}
