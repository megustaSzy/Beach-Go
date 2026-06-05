"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Map, 
  CalendarCheck, 
  Users, 
  Settings, 
  LogOut,
  Waves
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Kelola Pantai", href: "/dashboard/beaches", icon: Map },
  { name: "Booking & Tiket", href: "/dashboard/bookings", icon: CalendarCheck },
  { name: "Kelola User", href: "/dashboard/users", icon: Users },
  { name: "Pengaturan", href: "/dashboard/settings", icon: Settings },
];

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs transition-opacity lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={cn(
          "fixed top-0 bottom-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-card text-card-foreground transition-transform duration-300 lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo Section */}
        <div className="flex h-16 items-center gap-2 px-6 border-b border-border">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Waves className="h-5 w-5" />
          </div>
          <span className="font-bold text-lg tracking-tight">Beach-Go Admin</span>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 space-y-1 px-4 py-6">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 group relative",
                  isActive
                    ? "bg-secondary text-secondary-foreground font-semibold shadow-xs"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className={cn("h-4 w-4 shrink-0 transition-transform duration-200 group-hover:scale-105", isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                {item.name}
                {isActive && (
                  <span className="absolute right-3 h-1.5 w-1.5 rounded-full bg-primary" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer Section */}
        <div className="border-t border-border p-4">
          <Link
            href="/login"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            <span>Keluar</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
