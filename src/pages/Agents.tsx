
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { AgentsCard } from "@/components/dashboard/AgentsCard";
import { useIsMobile } from "@/hooks/use-mobile";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Agents() {
  const isMobile = useIsMobile();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        {!isMobile && <AppSidebar />}
        <main className="flex-1 flex flex-col bg-zinc-100">
          <div className="flex-1 p-8">
            <div className="max-w-7xl mx-auto space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold mb-2 animate-fade-down">Agents</h1>
                  <p className="text-muted-foreground animate-fade-up">View and manage your team of customer service agents</p>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search agents..."
                    className="w-[280px] pl-10"
                  />
                </div>
              </div>
              <AgentsCard />
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
