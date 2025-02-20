import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { BarChart2, Clock, Heart, PlayCircle, ThumbsUp, UserCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";

type KPI = {
  title: string;
  value: string;
  icon: React.ElementType;
  trend: string;
};

type Transcript = {
  id: number;
  audio: string;
  transcription: string;
  duration: string;
  timestamp: string;
};

const transcripts: Transcript[] = [
  {
    id: 1,
    audio: "https://example.com/audio1.mp3",
    transcription: "Customer: Hi, I'm having trouble with the checkout process.\n\nAgent: I'll be happy to help you with that. Could you describe what specific issue you're experiencing?\n\nCustomer: When I click on 'Complete Purchase,' nothing happens.\n\nAgent: Let me check that for you. Could you tell me which browser you're using?",
    duration: "2:15",
    timestamp: "2 mins ago"
  },
  {
    id: 2,
    audio: "https://example.com/audio2.mp3",
    transcription: "Customer: I'd like to know more about the premium features.\n\nAgent: I'll be glad to explain our premium features. Our premium plan includes advanced analytics, priority support, and custom integrations.",
    duration: "1:45",
    timestamp: "5 mins ago"
  },
  {
    id: 3,
    audio: "https://example.com/audio3.mp3",
    transcription: "Customer: How do I reset my password?\n\nAgent: I can help you with that. First, click on the 'Forgot Password' link on the login page. You'll receive an email with instructions.",
    duration: "1:30",
    timestamp: "8 mins ago"
  }
];

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

const Index = () => {
  const [selectedTranscript, setSelectedTranscript] = useState<Transcript | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
              {kpis.map(kpi => <Card key={kpi.title} className="p-6 shadow-sm transition-shadow hover:shadow-md animate-fade-up bg-white">
                  <div className="flex items-center justify-between mb-4">
                    {kpi.icon && <kpi.icon className="w-6 h-6 text-primary" />}
                    <span className="text-xs font-medium text-green-500">{kpi.trend}</span>
                  </div>
                  <h3 className="text-sm font-medium text-muted-foreground">{kpi.title}</h3>
                  <p className="text-2xl font-bold mt-1">{kpi.value}</p>
                </Card>)}
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6 shadow-sm transition-shadow hover:shadow-md animate-fade-up bg-white">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Recent Transcripts</h2>
                  <a href="/transcripts" className="text-sm text-primary hover:underline">
                    View all
                  </a>
                </div>
                <div className="space-y-4">
                  {transcripts.map(transcript => (
                    <div 
                      key={transcript.id} 
                      className="p-4 rounded-lg bg-secondary/50 cursor-pointer hover:bg-secondary/70 transition-colors"
                      onClick={() => {
                        setSelectedTranscript(transcript);
                        setIsModalOpen(true);
                      }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Call #{transcript.id}</span>
                        <span className="text-xs text-muted-foreground">{transcript.timestamp}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{transcript.transcription.slice(0, 100)}...</p>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6 shadow-sm transition-shadow hover:shadow-md animate-fade-up bg-white">
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

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <PlayCircle className="w-5 h-5" />
                    Call #{selectedTranscript?.id}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="bg-secondary/50 p-4 rounded-lg">
                    <audio controls className="w-full">
                      <source src={selectedTranscript?.audio} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                  <div className="max-h-[400px] overflow-y-auto">
                    <h3 className="font-semibold mb-2">Transcription</h3>
                    <div className="whitespace-pre-line text-sm text-muted-foreground">
                      {selectedTranscript?.transcription}
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </main>
      </div>
    </SidebarProvider>;
};

export default Index;
