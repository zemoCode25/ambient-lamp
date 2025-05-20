import {
  Calendar,
  LayoutDashboard,
  Settings,
  SlidersHorizontal,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { AuroraText } from "@/components/magicui/aurora-text";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Controls",
    url: "controls",
    icon: SlidersHorizontal,
  },
  {
    title: "Records",
    url: "records",
    icon: Calendar,
  },
  {
    title: "Settings",
    url: "settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="font-inter bg-amber-50 py-1 pl-2">
        <SidebarGroup className="flex flex-col gap-3">
          <SidebarGroupLabel>
            <AuroraText
              colors={["#1034E6", "#EDE500"]}
              className="rounded-sm text-lg font-bold"
            >
              AmbientLamp
            </AuroraText>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="hover:bg-blue-200">
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
