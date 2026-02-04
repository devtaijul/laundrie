"use client";

import {
  LayoutDashboard,
  FileText,
  Users,
  Truck,
  Star,
  DollarSign,
  Settings,
  LogOut,
  ChevronLeft,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./sidebar";

const menuItems = [
  { title: "Dashboard", url: "/admin/dashboard", icon: LayoutDashboard },
  { title: "Orders", url: "/admin/orders", icon: FileText },
  { title: "Customers", url: "/admin/customers", icon: Users },
  { title: "Drivers", url: "/admin/drivers", icon: Truck },
  { title: "Website Management", url: "/admin/website", icon: FileText },
  { title: "Reviews", url: "/admin/reviews", icon: Star },
  { title: "Finance", url: "/admin/finance", icon: DollarSign },
  { title: "Settings", url: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === "collapsed";
  const pathname = usePathname();

  return (
    <div
      className={`${isCollapsed ? "md:w-[80px]" : "md:w-[200px]"} transition-all duration-150`}
    >
      <Sidebar
        className="border-r border-border bg-background"
        collapsible="icon"
        side="left"
        variant="sidebar"
      >
        <div className="p-4 flex items-center justify-between border-b border-border">
          {!isCollapsed && (
            <h1 className="text-2xl font-bold text-primary">laundrie</h1>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="ml-auto"
          >
            <ChevronLeft
              className={`h-5 w-5 transition-transform ${isCollapsed ? "rotate-180" : ""}`}
            />
          </Button>
        </div>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.url}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                          pathname === item.url
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                      >
                        <item.icon className="h-5 w-5 flex-shrink-0" />
                        {!isCollapsed && <span>{item.title}</span>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <div className="mt-auto p-4 border-t border-border">
          <Button
            variant="ghost"
            className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <LogOut className="h-5 w-5 mr-3" />
            {!isCollapsed && <span>Logout</span>}
          </Button>
        </div>
      </Sidebar>
    </div>
  );
}
