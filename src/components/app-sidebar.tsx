
import { Home, MessageSquare, BarChart2, Settings, User, Bell, Lock, LogOut } from "lucide-react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

type MenuItem = {
  title: string;
  icon: React.ElementType;
  url: string;
};

const notifications = [
  {
    id: "1",
    title: "New Transcript Available",
    description: "A new customer conversation transcript has been processed.",
    time: "2 hours ago",
    unread: true
  },
  {
    id: "2",
    title: "Performance Update",
    description: "Your weekly performance metrics are now available.",
    time: "5 hours ago",
    unread: true
  },
  {
    id: "3",
    title: "System Update",
    description: "The system will undergo maintenance in 24 hours.",
    time: "1 day ago",
    unread: false
  }
];

const mainMenuItems: MenuItem[] = [{
  title: "Dashboard",
  icon: Home,
  url: "/dashboard"
}, {
  title: "Transcripts",
  icon: MessageSquare,
  url: "/transcripts"
}, {
  title: "Analytics",
  icon: BarChart2,
  url: "/analytics"
}];

const settingsMenuItems = [
  {
    title: "Settings",
    icon: Settings,
    url: "/settings"
  }
];

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    toast.success("Successfully logged out!");
    navigate("/login");
  };

  const linkClasses = `flex items-center gap-2 font-medium transition-colors duration-200 text-zinc-600 hover:text-primary hover:bg-zinc-100 h-10 px-3 rounded-md`;

  return (
    <Sidebar>
      <SidebarContent className="bg-white">
        <div className="flex flex-row items-center justify-between p-4 mb-0">
          <svg width="150" height="34" viewBox="0 0 228 52" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-2">
            <path d="M217.574 14.0616H221.814V18.8616H227.414V22.3016H221.814V33.9816C221.814 35.7016 222.654 36.5816 224.294 36.5816H227.374V40.0616H223.854C219.774 40.0616 217.574 37.9416 217.574 33.9816V22.3016H214.334V18.8616H217.574V14.0616Z" fill="black" />
            <path d="M209.869 25.5416C209.429 23.2616 207.309 21.9016 205.109 21.9016C202.949 21.9016 201.189 23.0216 201.189 24.9016C201.229 26.8216 203.669 27.5816 205.909 28.0216C211.189 28.9816 214.549 30.3816 214.549 34.5416C214.549 38.7016 210.389 40.5416 205.869 40.5416C200.469 40.5416 196.589 37.8216 196.269 33.3816L200.629 33.1016C201.069 35.5016 202.909 37.0216 205.829 37.0216C207.749 37.0216 210.149 36.3416 210.149 34.3416C210.109 32.0616 207.429 31.7816 205.149 31.2616C200.629 30.3016 196.789 29.0616 196.789 25.0216C196.789 20.9016 200.149 18.3816 205.429 18.3816C210.029 18.3816 213.549 21.0616 214.229 25.3016L209.869 25.5416Z" fill="black" />
            <path d="M190.074 18.8615H194.314V40.0615H190.074V18.8615ZM189.994 15.7415V11.7015H194.434V15.7415H189.994Z" fill="black" />
            <path d="M184.141 25.5416C183.701 23.2616 181.581 21.9016 179.381 21.9016C177.221 21.9016 175.461 23.0216 175.461 24.9016C175.501 26.8216 177.941 27.5816 180.181 28.0216C185.461 28.9816 188.821 30.3816 188.821 34.5416C188.821 38.7016 184.661 40.5416 180.141 40.5416C174.741 40.5416 170.861 37.8216 170.541 33.3816L174.901 33.1016C175.341 35.5016 177.181 37.0216 180.101 37.0216C182.021 37.0216 184.421 36.3416 184.421 34.3416C184.381 32.0616 181.701 31.7816 179.421 31.2616C174.901 30.3016 171.061 29.0616 171.061 25.0216C171.061 20.9016 174.421 18.3816 179.701 18.3816C184.301 18.3816 187.821 21.0616 188.501 25.3016L184.141 25.5416Z" fill="black" />
            <path d="M165.144 25.5416C164.704 23.2616 162.584 21.9016 160.384 21.9016C158.224 21.9016 156.464 23.0216 156.464 24.9016C156.504 26.8216 158.944 27.5816 161.184 28.0216C166.464 28.9816 169.824 30.3816 169.824 34.5416C169.824 38.7016 165.664 40.5416 161.144 40.5416C155.744 40.5416 151.864 37.8216 151.544 33.3816L155.904 33.1016C156.344 35.5016 158.184 37.0216 161.104 37.0216C163.024 37.0216 165.424 36.3416 165.424 34.3416C165.384 32.0616 162.704 31.7816 160.424 31.2616C155.904 30.3016 152.064 29.0616 152.064 25.0216C152.064 20.9016 155.424 18.3816 160.704 18.3816C165.304 18.3816 168.824 21.0616 169.504 25.3016L165.144 25.5416Z" fill="black" />
            <path d="M131.461 25.2216C132.301 20.9416 135.661 18.3816 140.541 18.3816C146.301 18.3816 149.461 21.5816 149.461 27.3816V35.2616C149.461 36.3416 149.941 36.7416 150.781 36.7416H151.621V40.0616H150.301C148.381 40.1016 145.781 39.7816 145.581 36.7816C144.621 38.8216 142.261 40.5416 138.741 40.5416C134.461 40.5416 131.101 38.2616 131.101 34.5016C131.101 30.2616 134.261 29.0216 139.141 28.1016L145.221 26.9016C145.181 23.5016 143.621 21.8216 140.541 21.8216C138.061 21.8216 136.421 23.1016 135.861 25.5016L131.461 25.2216ZM135.501 34.4216C135.501 35.9816 136.861 37.2616 139.661 37.2616C142.821 37.2216 145.301 34.9816 145.301 30.4216V30.1416L140.781 30.9416C137.861 31.4616 135.501 31.7416 135.501 34.4216Z" fill="black" />
            <path d="M111.938 18.8616H115.818L115.938 22.4216C117.018 19.5816 119.498 18.3816 122.378 18.3816C127.138 18.3816 129.578 21.7816 129.578 26.4216V40.0616H125.338V27.7416C125.338 23.9816 124.178 21.9416 121.218 21.9416C118.138 21.9416 116.178 23.9816 116.178 27.7416V40.0616H111.938V18.8616Z" fill="black" />
            <path d="M90.4905 29.4616C90.4905 22.7416 94.4505 18.3816 100.61 18.3816C105.69 18.3816 109.97 21.7816 110.17 29.3016L110.21 30.6616H94.9705C95.2505 34.6216 97.2905 36.9416 100.61 36.9416C102.69 36.9416 104.61 35.7016 105.45 33.6616L109.89 33.9816C108.65 38.0216 104.93 40.5416 100.61 40.5416C94.4505 40.5416 90.4905 36.1816 90.4905 29.4616ZM95.0505 27.5016H105.73C105.25 23.4616 103.01 21.9816 100.61 21.9816C97.5305 21.9816 95.5305 24.0216 95.0505 27.5016Z" fill="black" />
            <path d="M78.7433 38.9816C73.2633 38.9816 69.4233 34.8216 69.4233 28.7816C69.4233 22.6216 73.2233 18.3816 78.7033 18.3816C81.5433 18.3816 83.9433 19.8216 84.9433 22.1816V18.8616H89.0633V37.8216C89.0633 43.4216 85.0233 46.5416 79.2633 46.5416C74.6233 46.5416 71.1033 44.1416 70.0633 40.4216L74.4233 40.1416C75.1833 41.9416 76.9033 43.0216 79.3033 43.0216C82.7433 43.0216 84.7833 41.5016 84.7833 38.5416V35.4616C83.7433 37.5816 81.3833 38.9816 78.7433 38.9816ZM73.8233 28.7416C73.8233 32.9016 76.0233 35.5016 79.4233 35.5016C82.7033 35.5016 84.8633 32.9016 84.9033 28.7416C84.9833 24.6216 82.8233 22.0216 79.4233 22.0216C75.9833 22.0216 73.8233 24.6216 73.8233 28.7416Z" fill="black" />
            <path d="M4.27849 32.5687V19.5544C4.27849 18.4977 3.42181 17.641 2.36506 17.641C1.30831 17.641 0.450928 18.4977 0.450928 19.5544V32.5687C0.450928 33.6262 1.3076 34.4828 2.36506 34.4828C3.42252 34.4828 4.27849 33.6262 4.27849 32.5687Z" fill="#2100B1" />
            <path d="M6.6886 16.4927V36.652C6.6886 37.7087 7.54527 38.5654 8.60273 38.5654C9.66019 38.5654 10.5162 37.7087 10.5162 36.652V16.4927C10.5162 15.4359 9.65949 14.5785 8.60273 14.5785C7.54598 14.5785 6.6886 15.4359 6.6886 16.4927Z" fill="#2100B1" />
            <path d="M12.9263 7.30592V44.8172C12.9263 45.8739 13.7829 46.7313 14.8397 46.7313C15.8965 46.7313 16.7538 45.8746 16.7538 44.8172V7.30592C16.7538 6.24916 15.8972 5.39178 14.8397 5.39178C13.7822 5.39178 12.9263 6.24916 12.9263 7.30592Z" fill="#2100B1" />
            <path d="M19.1639 17.5135V34.6103C19.1639 35.6671 20.0206 36.5245 21.0781 36.5245C22.1355 36.5245 22.9915 35.6678 22.9915 34.6103V17.5135C22.9915 16.4567 22.1348 15.5993 21.0781 15.5993C20.0213 15.5993 19.1639 16.456 19.1639 17.5135Z" fill="#2100B1" />
            <path d="M25.4016 2.20252V49.9206C25.4016 50.9773 26.2583 51.8347 27.3157 51.8347C28.3732 51.8347 29.2299 50.978 29.2299 49.9206V2.20252C29.2299 1.14507 28.3732 0.288391 27.3157 0.288391C26.2583 0.288391 25.4016 1.14507 25.4016 2.20252Z" fill="#2100B1" />
            <path d="M31.6393 12.41V39.7137C31.6393 40.7705 32.496 41.6279 33.5527 41.6279C34.6095 41.6279 35.4668 40.7712 35.4668 39.7137V12.41C35.4668 11.3533 34.6102 10.4959 33.5527 10.4959C32.4953 10.4959 31.6393 11.3526 31.6393 12.41Z" fill="#2100B1" />
            <path d="M37.877 16.4927V36.652C37.877 37.7087 38.7336 38.5654 39.7911 38.5654C40.8485 38.5654 41.7045 37.7087 41.7045 36.652V16.4927C41.7045 15.4359 40.8478 14.5785 39.7911 14.5785C38.7343 14.5785 37.877 15.4359 37.877 16.4927Z" fill="#2100B1" />
            <path d="M44.1146 7.30592V45.8373C44.1146 46.8947 44.9713 47.7514 46.0281 47.7514C47.0848 47.7514 47.9422 46.8947 47.9422 45.8373V7.30592C47.9422 6.24916 47.0855 5.39178 46.0281 5.39178C44.9706 5.39178 44.1146 6.24916 44.1146 7.30592Z" fill="#2100B1" />
            <path d="M50.3523 17.5135V35.6312C50.3523 36.6879 51.209 37.5453 52.2664 37.5453C53.3239 37.5453 54.1799 36.6886 54.1799 35.6312V17.5135C54.1799 16.4567 53.3232 15.5993 52.2664 15.5993C51.2097 15.5993 50.3523 16.456 50.3523 17.5135Z" fill="#2100B1" />
            <path d="M60.4183 31.5479V20.5752C60.4183 19.5185 59.5616 18.6611 58.5041 18.6611C57.4467 18.6611 56.5907 19.5178 56.5907 20.5752V31.5479C56.5907 32.6046 57.4474 33.462 58.5041 33.462C59.5609 33.462 60.4183 32.6053 60.4183 31.5479Z" fill="#2100B1" />
          </svg>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Bell className="w-5 h-5 text-zinc-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              {notifications.map((notification) => (
                <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-3 space-y-1">
                  <div className="flex items-center justify-between w-full">
                    <span className="font-medium">{notification.title}</span>
                    <span className="text-xs text-muted-foreground">{notification.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{notification.description}</p>
                  {notification.unread && (
                    <div className="flex items-center gap-1 text-xs text-primary">
                      <div className="w-1 h-1 rounded-full bg-primary" />
                      New
                    </div>
                  )}
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem asChild className="p-3 border-t">
                <Link to="/notifications" className="w-full text-primary hover:text-primary">
                  View all notifications
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link 
                      to={item.url} 
                      className={`${linkClasses} ${item.url === currentPath ? "bg-[#F1F1F1] text-zinc-900" : ""}`}
                    >
                      {item.icon && <item.icon className="w-5 h-5" />}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <div className="mt-auto">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {settingsMenuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link 
                        to={item.url} 
                        className={`${linkClasses} ${item.url === currentPath ? "bg-[#F1F1F1] text-zinc-900" : ""}`}
                      >
                        <item.icon className="w-5 h-5" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
                <SidebarMenuItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className={linkClasses}>
                        <User className="w-5 h-5" />
                        <span>Account</span>
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem asChild className="flex items-center gap-2">
                        <Link to="/change-password" className="flex items-center gap-2">
                          <Lock className="w-4 h-4" />
                          <span>Change Password</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 text-red-600">
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
