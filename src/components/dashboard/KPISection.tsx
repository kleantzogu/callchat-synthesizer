
import { Clock, ThumbsUp, Award, CheckCircle } from "lucide-react";
import { MetricCard } from "../analytics/MetricCard";
import { generateMetricData } from "@/utils/analyticsData";

interface KPISectionProps {
  timeFilter: string;
}

export function KPISection({ timeFilter }: KPISectionProps) {
  const metrics = [
    {
      title: "Response Time",
      value: "2.5m",
      trend: "-12.40%",
      icon: Clock,
      color: "#3b82f6",
      data: generateMetricData(timeFilter, 2.5, 0.5),
      format: (value: number) => `${value.toFixed(1)}m`
    },
    {
      title: "Satisfaction",
      value: "92%",
      trend: "+5.23%",
      icon: ThumbsUp,
      color: "#16a34a",
      data: generateMetricData(timeFilter, 92, 5),
      format: (value: number) => `${value.toFixed(1)}%`
    },
    {
      title: "Service Quality",
      value: "4.8",
      trend: "+3.15%",
      icon: Award,
      color: "#9333ea",
      data: generateMetricData(timeFilter, 4.8, 0.3),
      format: (value: number) => value.toFixed(1)
    },
    {
      title: "Resolution Rate",
      value: "95%",
      trend: "+2.35%",
      icon: CheckCircle,
      color: "#dc2626",
      data: generateMetricData(timeFilter, 95, 3),
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
