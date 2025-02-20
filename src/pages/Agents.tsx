
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { AgentsCard } from "@/components/dashboard/AgentsCard";
import { useIsMobile } from "@/hooks/use-mobile";

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
              </div>
              <AgentsCard />
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
