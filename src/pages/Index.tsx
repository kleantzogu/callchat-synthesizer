
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { KPISection } from "@/components/dashboard/KPISection";
import { RecentTranscripts } from "@/components/dashboard/RecentTranscripts";
import { PerformanceSection } from "@/components/dashboard/PerformanceSection";

const timeFilters = [
  { label: "Today", value: "today" },
  { label: "Last 7 Days", value: "7days" },
  { label: "Last 30 Days", value: "30days" },
  { label: "Last 6 Months", value: "6months" },
  { label: "Last 12 Months", value: "12months" },
];

const Index = () => {
  const [timeFilter, setTimeFilter] = useState("30days");
  const isMobile = useIsMobile();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        {!isMobile && <AppSidebar />}
        <main className="flex-1 flex flex-col bg-zinc-100">
          <div className="flex-1 p-8">
            <div className="max-w-7xl mx-auto">
              <header className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <h1 className="text-3xl font-bold animate-fade-down">Welcome to Kleant</h1>
                  <Select value={timeFilter} onValueChange={setTimeFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select time range" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeFilters.map((filter) => (
                        <SelectItem key={filter.value} value={filter.value}>
                          {filter.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <p className="text-muted-foreground animate-fade-up">Monitor and analyze your customer interactions in real-time</p>
              </header>

              <KPISection />

              <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RecentTranscripts />
                <PerformanceSection />
              </section>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
