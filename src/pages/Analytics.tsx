
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Timer, SmileIcon, Award, CheckCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { MetricCard } from "@/components/analytics/MetricCard";
import { PerformanceChart } from "@/components/analytics/PerformanceChart";
import { generateTimeData, generateMetricData } from "@/utils/analyticsData";

const Analytics = () => {
  const [timeFrame, setTimeFrame] = useState('7days');

  const metricCards = [
    {
      title: "Response Time",
      value: "2.5 min",
      trend: "-12%",
      icon: Timer,
      data: generateMetricData(timeFrame, 2.5, 1),
      color: "#3b82f6",
      format: (value: number) => `${value.toFixed(1)} min`
    },
    {
      title: "Satisfaction",
      value: "92%",
      trend: "+5%",
      icon: SmileIcon,
      data: generateMetricData(timeFrame, 92, 10),
      color: "#10b981",
      format: (value: number) => `${value.toFixed(0)}%`
    },
    {
      title: "Service Quality",
      value: "4.8/5",
      trend: "+0.3",
      icon: Award,
      data: generateMetricData(timeFrame, 4.8, 0.5),
      color: "#8b5cf6",
      format: (value: number) => `${value.toFixed(1)}/5`
    },
    {
      title: "Resolution Rate",
      value: "95%",
      trend: "+8%",
      icon: CheckCircle,
      data: generateMetricData(timeFrame, 95, 8),
      color: "#f59e0b",
      format: (value: number) => `${value.toFixed(0)}%`
    }
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 flex flex-col bg-zinc-100 min-h-screen overflow-x-hidden">
          <div className="flex-1 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
            <div className="max-w-7xl mx-auto">
              <header className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2 animate-fade-down">Analytics</h1>
                  <p className="text-sm sm:text-base text-muted-foreground animate-fade-up">Track and analyze your performance metrics</p>
                </div>
                <Select 
                  defaultValue="7days" 
                  onValueChange={setTimeFrame}
                >
                  <SelectTrigger className="w-full sm:w-[180px]">
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                {metricCards.map((metric) => (
                  <MetricCard key={metric.title} {...metric} />
                ))}
              </div>

              <PerformanceChart data={generateTimeData(timeFrame)} />
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Analytics;
