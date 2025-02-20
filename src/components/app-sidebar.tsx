import { Home, MessageSquare, BarChart2, Settings, UserRound } from "lucide-react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
type MenuItem = {
  title: string;
  icon: React.ElementType; // Changed from LucideIcon type
  url: string;
};
const menuItems: MenuItem[] = [{
  title: "Dashboard",
  icon: Home,
  url: "/"
}, {
  title: "Transcripts",
  icon: MessageSquare,
  url: "/transcripts"
}, {
  title: "Analytics",
  icon: BarChart2,
  url: "/analytics"
}, {
  title: "Settings",
  icon: Settings,
  url: "/settings"
}];
export function AppSidebar() {
  return <Sidebar>
      <SidebarContent className="bg-white">
        <div className="flex flex-row items-center p-4 mb-4">
          <UserRound className="w-10 h-10 mb-2" />
          <h1 className="text-lg font-semibold">RitechGenAssist</h1>
        </div>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map(item => <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-2">
                      {item.icon && <item.icon className="w-5 h-5" />}
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>;
}