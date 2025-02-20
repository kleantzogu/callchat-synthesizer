
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Clock, ThumbsUp, AlertTriangle } from "lucide-react";

const data = [
  { name: 'Mon', value: 85 },
  { name: 'Tue', value: 88 },
  { name: 'Wed', value: 92 },
  { name: 'Thu', value: 87 },
  { name: 'Fri', value: 91 },
  { name: 'Sat', value: 84 },
  { name: 'Sun', value: 89 },
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

const Analytics = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-8 bg-zinc-200 hover:bg-zinc-100">
          <div className="max-w-7xl mx-auto">
            <header className="mb-8">
              <h1 className="text-3xl font-bold mb-2 animate-fade-down">Analytics</h1>
              <p className="text-muted-foreground animate-fade-up">Track and analyze your performance metrics</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {insights.map((insight) => (
                <Card key={insight.title} className="p-6 glass card-hover animate-fade-up bg-white">
                  <div className="flex items-center justify-between mb-4">
                    <insight.icon className="w-6 h-6 text-primary" />
                    <span className={`text-xs font-medium ${
                      insight.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {insight.trend}
                    </span>
                  </div>
                  <h3 className="text-sm font-medium text-muted-foreground">{insight.title}</h3>
                  <p className="text-2xl font-bold mt-1">{insight.value}</p>
                  <p className="text-sm text-muted-foreground mt-2">{insight.description}</p>
                </Card>
              ))}
            </div>

            <Card className="p-6 glass card-hover animate-fade-up bg-white">
              <h2 className="text-lg font-semibold mb-4">Weekly Performance Trend</h2>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Analytics;
