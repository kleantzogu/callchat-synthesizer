import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Clock, ThumbsUp, AlertTriangle, Bell, User, Timer, SmileIcon, Award, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Area, AreaChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const weeklyData = [
  { name: 'Mon', value: 85 },
  { name: 'Tue', value: 88 },
  { name: 'Wed', value: 92 },
  { name: 'Thu', value: 87 },
  { name: 'Fri', value: 91 },
  { name: 'Sat', value: 84 },
  { name: 'Sun', value: 89 },
];

const metricCards = [
  {
    title: "Response Time",
    value: "2.5 min",
    trend: "-12%",
    icon: Timer,
    data: [
      { name: '1', value: 3 },
      { name: '2', value: 2.8 },
      { name: '3', value: 2.6 },
      { name: '4', value: 2.5 },
      { name: '5', value: 2.3 },
    ],
    color: "#3b82f6"
  },
  {
    title: "Satisfaction",
    value: "92%",
    trend: "+5%",
    icon: SmileIcon,
    data: [
      { name: '1', value: 85 },
      { name: '2', value: 88 },
      { name: '3', value: 90 },
      { name: '4', value: 91 },
      { name: '5', value: 92 },
    ],
    color: "#10b981"
  },
  {
    title: "Service Quality",
    value: "4.8/5",
    trend: "+0.3",
    icon: Award,
    data: [
      { name: '1', value: 4.5 },
      { name: '2', value: 4.6 },
      { name: '3', value: 4.7 },
      { name: '4', value: 4.7 },
      { name: '5', value: 4.8 },
    ],
    color: "#8b5cf6"
  },
  {
    title: "Resolution Rate",
    value: "95%",
    trend: "+8%",
    icon: CheckCircle,
    data: [
      { name: '1', value: 87 },
      { name: '2', value: 89 },
      { name: '3', value: 91 },
      { name: '4', value: 93 },
      { name: '5', value: 95 },
    ],
    color: "#f59e0b"
  }
];

const insights = [
  {
    title: "Average Call Duration",
    value: "8m 45s",
    trend: "-12%",
    icon: Clock,
    description: "Decreased from last week"
  },
  {
    title: "Customer Satisfaction",
    value: "92%",
    trend: "+5%",
    icon: ThumbsUp,
    description: "Improved from last week"
  },
  {
    title: "Issues Identified",
    value: "24",
    trend: "-8%",
    icon: AlertTriangle,
    description: "Fewer issues than last week"
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

const Analytics = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 flex flex-col bg-zinc-100">
          <div className="w-full bg-white border-b">
            <div className="flex items-center justify-between h-16 px-8">
              <h2 className="text-xl font-semibold">Analytics</h2>
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
            <div className="max-w-7xl mx-auto">
              <header className="mb-8 flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold mb-2 animate-fade-down">Analytics</h1>
                  <p className="text-muted-foreground animate-fade-up">Track and analyze your performance metrics</p>
                </div>
                <Select defaultValue="7days">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select time period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="7days">Last 7 Days</SelectItem>
                    <SelectItem value="30days">Last 30 Days</SelectItem>
                    <SelectItem value="6months">Last 6 Months</SelectItem>
                    <SelectItem value="12months">Last 12 Months</SelectItem>
                  </SelectContent>
                </Select>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {metricCards.map((metric) => (
                  <Card key={metric.title} className="p-6 shadow-sm transition-shadow hover:shadow-md animate-fade-up bg-white">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <metric.icon className="w-5 h-5" style={{ color: metric.color }} />
                        <h3 className="font-medium">{metric.title}</h3>
                      </div>
                      <span className={`text-xs font-medium ${
                        metric.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {metric.trend}
                      </span>
                    </div>
                    <p className="text-2xl font-bold mb-4">{metric.value}</p>
                    <div className="h-[100px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={metric.data}>
                          <defs>
                            <linearGradient id={`color${metric.title.replace(/\s+/g, '')}`} x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor={metric.color} stopOpacity={0.1}/>
                              <stop offset="95%" stopColor={metric.color} stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <Area
                            type="monotone"
                            dataKey="value"
                            stroke={metric.color}
                            strokeWidth={2}
                            fill={`url(#color${metric.title.replace(/\s+/g, '')})`}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </Card>
                ))}
              </div>

              <Card className="p-6 shadow-sm transition-shadow hover:shadow-md animate-fade-up bg-white">
                <h2 className="text-lg font-semibold mb-4">Weekly Performance Trend</h2>
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={weeklyData}>
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis 
                        dataKey="name" 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#666', fontSize: 12 }}
                      />
                      <YAxis 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#666', fontSize: 12 }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#fff',
                          border: 'none',
                          borderRadius: '8px',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        fill="url(#colorValue)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Analytics;
