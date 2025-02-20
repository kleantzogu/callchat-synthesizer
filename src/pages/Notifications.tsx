
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { useIsMobile } from "@/hooks/use-mobile"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, Check, Clock, Filter } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Notification = {
  id: string
  title: string
  description: string
  timestamp: string
  type: "info" | "success" | "warning" | "error"
  read: boolean
}

const sampleNotifications: Notification[] = [
  {
    id: "1",
    title: "New Customer Transcript Available",
    description: "A new conversation with customer ID #1234 has been processed and is ready for review.",
    timestamp: "Just now",
    type: "info",
    read: false
  },
  {
    id: "2",
    title: "Weekly Performance Report",
    description: "Your weekly performance metrics have been updated. View your latest statistics.",
    timestamp: "2 hours ago",
    type: "success",
    read: false
  },
  {
    id: "3",
    title: "System Maintenance Notice",
    description: "Scheduled maintenance will occur on Saturday at 2 AM EST. Service interruptions may occur.",
    timestamp: "1 day ago",
    type: "warning",
    read: true
  },
  {
    id: "4",
    title: "New Feature Available",
    description: "Check out our new analytics dashboard with improved visualization options.",
    timestamp: "2 days ago",
    type: "info",
    read: true
  }
]

const NotificationCard = ({ notification }: { notification: Notification }) => {
  const typeStyles = {
    info: "bg-blue-50 border-blue-200",
    success: "bg-green-50 border-green-200",
    warning: "bg-yellow-50 border-yellow-200",
    error: "bg-red-50 border-red-200"
  }

  return (
    <Card className={`mb-4 ${!notification.read ? typeStyles[notification.type] : ''}`}>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          {notification.title}
        </CardTitle>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {notification.timestamp}
          </span>
          {!notification.read && (
            <div className="h-2 w-2 rounded-full bg-blue-500" />
          )}
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription>{notification.description}</CardDescription>
      </CardContent>
    </Card>
  )
}

const Notifications = () => {
  const isMobile = useIsMobile()

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        {!isMobile && <AppSidebar />}
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold flex items-center gap-2">
                  <Bell className="w-8 h-8" /> Notifications
                </h1>
                <p className="text-muted-foreground mt-1">
                  Stay updated with your latest activities and alerts
                </p>
              </div>
              <div className="flex items-center gap-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Filter by Type</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>All</DropdownMenuItem>
                    <DropdownMenuItem>Unread</DropdownMenuItem>
                    <DropdownMenuItem>System</DropdownMenuItem>
                    <DropdownMenuItem>Reports</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button size="sm" variant="outline">
                  <Check className="h-4 w-4 mr-2" />
                  Mark all as read
                </Button>
              </div>
            </div>

            <Tabs defaultValue="all" className="space-y-4">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="unread">Unread</TabsTrigger>
                <TabsTrigger value="archived">Archived</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="space-y-4">
                {sampleNotifications.map((notification) => (
                  <NotificationCard key={notification.id} notification={notification} />
                ))}
              </TabsContent>
              <TabsContent value="unread" className="space-y-4">
                {sampleNotifications
                  .filter((n) => !n.read)
                  .map((notification) => (
                    <NotificationCard key={notification.id} notification={notification} />
                  ))}
              </TabsContent>
              <TabsContent value="archived" className="space-y-4">
                <p className="text-center text-muted-foreground py-8">
                  No archived notifications
                </p>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

export default Notifications
