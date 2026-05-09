"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Settings2Icon,
  CircleHelpIcon,
  DatabaseIcon,
  FileIcon,
  LogOutIcon,
  User,
  Eye,
  UtensilsCrossed,
  BarChart,
  WavesIcon,
  Palmtree,
  StarHalf,
  Star,
} from "lucide-react";
import { NavSecondary } from "@/components/nav-secondary";
import Link from "next/link";
import { NavUser } from "./nav-user";
import { NavMenuSidebar } from "./NavMenuSidebar";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },

  navSecondary: [
    {
      title: "Logout",
      url: "/",
      icon: <LogOutIcon />,
    },
    {
      title: "Get Help",
      url: "#",
      icon: <CircleHelpIcon />,
    },
    {
      title: "Settings",
      url: "#",
      icon: <Settings2Icon />,
    },
  ],
  menu: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: <DatabaseIcon />,
    },
    {
      name: "Beach",
      url: "/beaches",
      icon: <Palmtree />,
    },
    {
      name: "Rating Beach",
      url: "/ratings",
      icon: <Star />,
    },
    {
      name: "Users",
      url: "/users",
      icon: <User />,
    },
  ],
};
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="data-[slot=sidebar-menu-button]:p-1.5! h-auto"
              render={<Link href="/dashboard" />}
            >
              {/* <CommandIcon className="size-5!" /> */}
              <div className="flex flex-col items-start leading-tight ml-5">
                <span className="text-2xl font-semibold text-blue-600">
                  Beach Go
                </span>
                <span className="text-sm text-muted-foreground">CMS</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMenuSidebar items={data.menu} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
