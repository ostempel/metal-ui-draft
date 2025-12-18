"use client";
import * as React from "react";
import {
  IconBuilding,
  IconCloudPin,
  IconDashboard,
  IconGlobe,
  IconHelp,
  IconKey,
  IconPackage,
  IconRocket,
  IconSearch,
  IconServer2,
  IconSettings,
  IconSwitch2,
  IconUsers,
} from "@tabler/icons-react";
import { NavInfrastructure } from "@/components/ui/app-shell/nav-documents";
import { NavMain } from "@/components/ui/app-shell/nav-main";
import { NavSecondary } from "@/components/ui/app-shell/nav-secondary";
import { NavUser } from "@/components/ui/app-shell/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import logo from "@/assets/metal-stack.png";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: IconDashboard,
    },
    {
      title: "Tenants",
      url: "/tenants",
      icon: IconBuilding,
    },
    {
      title: "Projects",
      url: "/projects",
      icon: IconRocket,
    },
    {
      title: "Users",
      url: "/users",
      icon: IconUsers,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
  infrastructure: [
    {
      name: "Partitions",
      url: "/partitions",
      icon: IconCloudPin,
    },
    {
      name: "Machines",
      url: "/machines",
      icon: IconServer2,
    },
    {
      name: "Switches",
      url: "/switches",
      icon: IconSwitch2,
    },
    {
      name: "Images",
      url: "/images",
      icon: IconPackage,
    },
    {
      name: "IPs",
      url: "/ips",
      icon: IconGlobe,
    },
    {
      name: "Tokens",
      url: "/tokens",
      icon: IconKey,
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
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <img src={logo} alt="metal-stack" className="h-5 w-5" />
                <span className="text-base font-semibold">metal-stack.io</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavInfrastructure items={data.infrastructure} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
