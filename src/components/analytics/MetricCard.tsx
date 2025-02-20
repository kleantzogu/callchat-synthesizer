
import { Card } from "@/components/ui/card";
import { Area, AreaChart, Tooltip, ResponsiveContainer } from 'recharts';
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  trend: string;
  icon: LucideIcon;
  data: Array<{ name: string; value: number }>;
  color: string;
  format: (value: number) => string;
}

export const MetricCard = ({ 
  title, 
  value, 
  trend, 
  icon: Icon, 
  data, 
  color, 
  format 
}: MetricCardProps) => {
  return (
    <Card className="p-4 sm:p-6 shadow-sm transition-shadow hover:shadow-md animate-fade-up bg-white">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 sm:w-5 sm:h-5" style={{ color }} />
          <h3 className="text-sm sm:text-base font-medium">{title}</h3>
        </div>
        <span className={`text-xs font-medium ${
          trend.startsWith('+') ? 'text-green-500' : 'text-red-500'
        }`}>
          {trend}
        </span>
      </div>
      <p className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">{value}</p>
      <div className="h-[80px] sm:h-[100px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id={`color${title.replace(/\s+/g, '')}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.1}/>
                <stop offset="95%" stopColor={color} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white p-2 rounded-lg shadow-lg border text-xs sm:text-sm">
                      <p className="font-medium">
                        {format(payload[0].value as number)}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              fill={`url(#color${title.replace(/\s+/g, '')})`}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
