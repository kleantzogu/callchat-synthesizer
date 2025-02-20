
import { Users, ArrowUpRight, MessageSquare, Clock } from "lucide-react";
import { MetricCard } from "../analytics/MetricCard";
import { generateMetricData } from "@/utils/analyticsData";

interface KPISectionProps {
  timeFilter: string;
}

export function KPISection({ timeFilter }: KPISectionProps) {
  const metrics = [
    {
      title: "Active Users",
      value: "2,420",
      trend: "+5.23%",
      icon: Users,
      color: "#3b82f6",
      data: generateMetricData(timeFilter, 2420, 200),
      format: (value: number) => value.toLocaleString()
    },
    {
      title: "Messages Sent",
      value: "1,210",
      trend: "+10.15%",
      icon: MessageSquare,
      color: "#16a34a",
      data: generateMetricData(timeFilter, 1210, 100),
      format: (value: number) => value.toLocaleString()
    },
    {
      title: "Avg. Response Time",
      value: "2.5m",
      trend: "-12.40%",
      icon: Clock,
      color: "#dc2626",
      data: generateMetricData(timeFilter, 2.5, 0.5),
      format: (value: number) => `${value.toFixed(1)}m`
    },
    {
      title: "Conversion Rate",
      value: "12.5%",
      trend: "+2.35%",
      icon: ArrowUpRight,
      color: "#9333ea",
      data: generateMetricData(timeFilter, 12.5, 2),
      format: (value: number) => `${value.toFixed(1)}%`
    }
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {metrics.map((metric) => (
        <MetricCard key={metric.title} {...metric} />
      ))}
    </section>
  );
}
