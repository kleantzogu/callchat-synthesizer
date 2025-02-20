
import { Card } from "@/components/ui/card";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const performanceData = [
  { date: "Jan 24", value: 12000 },
  { date: "Jan 25", value: 13500 },
  { date: "Jan 26", value: 12800 },
  { date: "Jan 27", value: 14200 },
  { date: "Jan 28", value: 13900 },
  { date: "Jan 29", value: 14500 },
  { date: "Jan 30", value: 14032 },
  { date: "Jan 31", value: 14800 },
  { date: "Feb 1", value: 14200 },
  { date: "Feb 2", value: 14600 },
];

export function PerformanceSection() {
  return (
    <Card className="p-6 shadow-sm transition-shadow hover:shadow-md animate-fade-up bg-white">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Weekly Performance Trend</h2>
        <a href="/analytics" className="text-sm text-primary hover:underline">
          View details
        </a>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={performanceData}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="date" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#666', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#666', fontSize: 12 }}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
            />
            <Tooltip
              formatter={(value: number) => [`$${value.toLocaleString()}`, 'Value']}
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
  );
}
