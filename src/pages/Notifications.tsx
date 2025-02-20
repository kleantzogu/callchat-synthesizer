
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Notification = {
  id: string;
  title: string;
  description: string;
  time: string;
  unread: boolean;
};

const notifications: Notification[] = [
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

const Notifications = () => {
  const isMobile = useIsMobile();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        {!isMobile && <AppSidebar />}
        <main className="flex-1 flex flex-col bg-zinc-100">
          <div className="flex-1 p-8">
            <div className="max-w-3xl mx-auto space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">Notifications</h1>
                <p className="text-muted-foreground">Stay updated with your latest activities</p>
              </div>
              
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <Card key={notification.id} className={cn("p-4", notification.unread && "border-l-4 border-l-primary")}>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{notification.title}</h3>
                      <span className="text-sm text-muted-foreground">{notification.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{notification.description}</p>
                    {notification.unread && (
                      <div className="flex items-center gap-1 text-xs text-primary mt-2">
                        <div className="w-1 h-1 rounded-full bg-primary" />
                        New
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Notifications;
