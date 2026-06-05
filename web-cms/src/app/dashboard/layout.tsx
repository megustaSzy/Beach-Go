"use client";

import { useState } from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";
import { DataProvider } from "@/components/dashboard/data-context";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <DataProvider>
      <div className="min-h-screen bg-background text-foreground flex">
        {/* Sidebar navigation */}
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col lg:pl-64 min-w-0">
          <Header onMenuClick={() => setSidebarOpen(true)} />
          
          <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto animate-in fade-in slide-in-from-bottom-2 duration-300">
            {children}
          </main>
        </div>
      </div>
    </DataProvider>
  );
}
