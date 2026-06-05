"use client";

import { useTheme } from "@/components/theme-provider";
import { Sun, Moon, Bell, Menu, User } from "lucide-react";
import { usePathname } from "next/navigation";

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  // Generate page title from pathname
  const getPageTitle = () => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length <= 1) return "Dashboard Overview";
    
    const page = segments[1];
    switch (page) {
      case "beaches":
        return "Kelola Pantai";
      case "bookings":
        return "Booking & Tiket";
      case "users":
        return "Kelola User";
      case "settings":
        return "Pengaturan";
      default:
        return "Dashboard Panel";
    }
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border bg-background/80 backdrop-blur-md px-6">
      {/* Left section: Hamburger & Title */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-lg p-1.5 hover:bg-muted text-muted-foreground hover:text-foreground lg:hidden"
          aria-label="Toggle menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <h1 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
          {getPageTitle()}
        </h1>
      </div>

      {/* Right section: Actions */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <button
          type="button"
          className="relative rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          aria-label="View notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive" />
        </button>

        {/* Theme Toggle */}
        <button
          type="button"
          onClick={toggleTheme}
          className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          aria-label="Toggle theme"
        >
          {theme === "light" ? (
            <Moon className="h-5 w-5 animate-in fade-in zoom-in-75 duration-200" />
          ) : (
            <Sun className="h-5 w-5 animate-in fade-in zoom-in-75 duration-200" />
          )}
        </button>

        <div className="h-6 w-px bg-border mx-1" />

        {/* Profile */}
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-secondary-foreground border border-border">
            <User className="h-4.5 w-4.5" />
          </div>
          <div className="hidden flex-col text-left text-xs md:flex">
            <span className="font-semibold text-foreground leading-none">Fajar Azriel</span>
            <span className="text-[10px] text-muted-foreground mt-0.5 leading-none">Super Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
}
