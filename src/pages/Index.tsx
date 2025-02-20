
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { BarChart2, Clock, Heart, ThumbsUp, UserCheck } from "lucide-react";
import { Card } from "@/components/ui/card";

type KPI = {
  title: string;
  value: string;
  icon: React.ElementType; // Changed from LucideIcon type
  trend: string;
};

const kpis: KPI[] = [{
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
}];

const Index = () => {
  return <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-8 bg-zinc-100">
          <div className="max-w-7xl mx-auto">
            <header className="mb-8">
              <h1 className="text-3xl font-bold mb-2 animate-fade-down">Welcome to Kleant</h1>
              <p className="text-muted-foreground animate-fade-up">Monitor and analyze your customer interactions in real-time</p>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {kpis.map(kpi => <Card key={kpi.title} className="p-6 glass card-hover animate-fade-up 1px rounded-xl bg-white">
                  <div className="flex items-center justify-between mb-4">
                    {kpi.icon && <kpi.icon className="w-6 h-6 text-primary" />}
                    <span className="text-xs font-medium text-green-500">{kpi.trend}</span>
                  </div>
                  <h3 className="text-sm font-medium text-muted-foreground">{kpi.title}</h3>
                  <p className="text-2xl font-bold mt-1">{kpi.value}</p>
                </Card>)}
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6 glass card-hover animate-fade-up bg-white">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Recent Transcripts</h2>
                  <a href="/transcripts" className="text-sm text-primary hover:underline">
                    View all
                  </a>
                </div>
                <div className="space-y-4">
                  {[1, 2, 3].map(i => <div key={i} className="p-4 rounded-lg bg-secondary/50">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Call #{i}</span>
                        <span className="text-xs text-muted-foreground">2 mins ago</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Customer inquiry about product features...</p>
                    </div>)}
                </div>
              </Card>

              <Card className="p-6 glass card-hover animate-fade-up bg-white">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Analytics Overview</h2>
                  <a href="/analytics" className="text-sm text-primary hover:underline">
                    View details
                  </a>
                </div>
                <div className="h-[300px] flex items-center justify-center">
                  <BarChart2 className="w-32 h-32 text-muted-foreground/20" />
                </div>
              </Card>
            </section>
          </div>
        </main>
      </div>
    </SidebarProvider>;
};

export default Index;
