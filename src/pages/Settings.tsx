import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, Lock, User, Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const settingSections = [
  {
    title: "Profile Settings",
    icon: User,
    description: "Manage your account information and preferences",
    fields: [
      { label: "Full Name", type: "text", placeholder: "John Doe" },
      { label: "Email", type: "email", placeholder: "john@example.com" },
      { label: "Role", type: "text", placeholder: "Support Agent" }
    ]
  },
  {
    title: "Notification Preferences",
    icon: Bell,
    description: "Configure how you receive notifications",
    fields: [
      { label: "Email Notifications", type: "checkbox" },
      { label: "Desktop Notifications", type: "checkbox" },
      { label: "Daily Summary", type: "checkbox" }
    ]
  },
  {
    title: "Security",
    icon: Lock,
    description: "Manage your security settings and preferences",
    fields: [
      { label: "Two-Factor Authentication", type: "checkbox" },
      { label: "Session Timeout (minutes)", type: "number", placeholder: "30" }
    ]
  },
  {
    title: "Language & Region",
    icon: Globe,
    description: "Set your language and regional preferences",
    fields: [
      { label: "Language", type: "select", options: ["English", "Spanish", "French"] },
      { label: "Time Zone", type: "select", options: ["UTC", "UTC+1", "UTC-5"] }
    ]
  }
];

const notifications = [
  {
    id: 1,
    title: "New transcript available",
    description: "Call #123 has been transcribed",
    time: "2 mins ago",
    unread: true,
  },
  {
    id: 2,
    title: "Analysis complete",
    description: "Sentiment analysis finished for call #456",
    time: "1 hour ago",
    unread: true,
  },
  {
    id: 3,
    title: "System update",
    description: "New features available in the dashboard",
    time: "2 hours ago",
    unread: false,
  }
];

const Settings = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 flex flex-col bg-zinc-100">
          <div className="w-full bg-white border-b">
            <div className="flex items-center justify-between h-16 px-8">
              <h2 className="text-xl font-semibold">Settings</h2>
              <div className="flex items-center gap-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
                      <Bell className="w-5 h-5" />
                      <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80">
                    {notifications.map((notification) => (
                      <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-3 space-y-1 cursor-pointer">
                        <div className="flex items-center justify-between w-full">
                          <span className="font-medium">{notification.title}</span>
                          <span className="text-xs text-muted-foreground">{notification.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{notification.description}</p>
                        {notification.unread && (
                          <div className="flex items-center gap-1 text-xs text-blue-500">
                            <div className="w-1 h-1 rounded-full bg-blue-500" />
                            New
                          </div>
                        )}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                      <User className="w-5 h-5" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="cursor-pointer">
                      Account Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer text-red-600">
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>

          <div className="flex-1 p-8">
            <header className="mb-8">
              <h1 className="text-3xl font-bold mb-2 animate-fade-down">Settings</h1>
              <p className="text-muted-foreground animate-fade-up">Manage your account settings and preferences</p>
            </header>

            <div className="space-y-6">
              {settingSections.map((section) => (
                <Card key={section.title} className="p-6 shadow-sm transition-shadow hover:shadow-md animate-fade-up bg-white">
                  <div className="flex items-center gap-3 mb-4">
                    <section.icon className="w-6 h-6 text-primary" />
                    <div>
                      <h2 className="text-lg font-semibold">{section.title}</h2>
                      <p className="text-sm text-muted-foreground">{section.description}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {section.fields.map((field) => (
                      <div key={field.label} className="flex items-center justify-between">
                        <label className="text-sm font-medium">{field.label}</label>
                        {field.type === "checkbox" ? (
                          <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                          />
                        ) : field.type === "select" ? (
                          <select className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring">
                            {field.options?.map((option) => (
                              <option key={option}>{option}</option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type={field.type}
                            placeholder={field.placeholder}
                            className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              ))}

              <div className="flex justify-end gap-4">
                <Button variant="outline">Cancel</Button>
                <Button>Save Changes</Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Settings;
