
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Card } from "@/components/ui/card";
import { MessageSquare, Search } from "lucide-react";

const transcripts = [
  {
    id: 1,
    date: "2024-03-10",
    duration: "15:23",
    topic: "Product Inquiry",
    sentiment: "Positive",
    status: "Completed"
  },
  {
    id: 2,
    date: "2024-03-10",
    duration: "08:45",
    topic: "Technical Support",
    sentiment: "Neutral",
    status: "In Review"
  },
  {
    id: 3,
    date: "2024-03-09",
    duration: "12:10",
    topic: "Billing Question",
    sentiment: "Neutral",
    status: "Completed"
  }
];

const Transcripts = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-8 bg-zinc-200 hover:bg-zinc-100">
          <div className="max-w-7xl mx-auto">
            <header className="mb-8">
              <h1 className="text-3xl font-bold mb-2 animate-fade-down">Transcripts</h1>
              <p className="text-muted-foreground animate-fade-up">Review and analyze your conversation transcripts</p>
            </header>

            <Card className="p-6 mb-6 glass card-hover animate-fade-up bg-white">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search transcripts..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </Card>

            <div className="space-y-4">
              {transcripts.map((transcript) => (
                <Card key={transcript.id} className="p-6 glass card-hover animate-fade-up bg-white">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <MessageSquare className="w-6 h-6 text-primary mt-1" />
                      <div>
                        <h3 className="font-semibold">Call #{transcript.id} - {transcript.topic}</h3>
                        <p className="text-sm text-muted-foreground mt-1">Duration: {transcript.duration}</p>
                        <p className="text-sm text-muted-foreground">Date: {transcript.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {transcript.sentiment}
                      </span>
                      <p className="text-sm text-muted-foreground mt-2">{transcript.status}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Transcripts;
