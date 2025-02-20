
import { BarChart2, Clock, Heart, ThumbsUp, UserCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

type KPI = {
  title: string;
  value: string;
  icon: React.ElementType;
  trend: string;
};

const kpis: KPI[] = [
  {
    title: "Response Time",
    value: "1.5s",
    icon: Clock,
    trend: "+5%"
  }, {
    title: "Satisfaction",
    value: "95%",
    icon: Heart,
    trend: "+2%"
  }, {
    title: "Service Quality",
    value: "92%",
    icon: ThumbsUp,
    trend: "+3%"
  }, {
    title: "Resolution Rate",
    value: "88%",
    icon: UserCheck,
    trend: "+1%"
  }
];

export function KPISection() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {kpis.map(kpi => (
        <Card key={kpi.title} className="p-6 shadow-sm transition-shadow hover:shadow-md animate-fade-up bg-white">
          <div className="flex items-center justify-between mb-4">
            {kpi.icon && <kpi.icon className="w-6 h-6 text-primary" />}
            <Badge variant="secondary" className={`${kpi.trend.startsWith('+') ? 'bg-green-100 text-green-800 hover:bg-green-100' : 'bg-red-100 text-red-800 hover:bg-red-100'}`}>
              {kpi.trend}
            </Badge>
          </div>
          <h3 className="text-sm font-medium text-muted-foreground">{kpi.title}</h3>
          <p className="text-2xl font-bold mt-1">{kpi.value}</p>
        </Card>
      ))}
    </section>
  );
}
