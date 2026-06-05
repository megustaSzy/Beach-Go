import React from "react";
import { FolderOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title?: string;
  description?: string;
  className?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export function EmptyState({
  title = "Data tidak ditemukan",
  description = "Silakan periksa kata kunci pencarian Anda atau buat data baru.",
  className,
  icon: Icon = FolderOpen,
}: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center rounded-xl border border-dashed border-border p-12 text-center", className)}>
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted text-muted-foreground">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mt-4 font-semibold text-foreground text-sm">{title}</h3>
      <p className="mt-1.5 text-xs text-muted-foreground max-w-xs leading-relaxed">{description}</p>
    </div>
  );
}
