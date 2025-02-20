
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { MessageSquare, Search, Bell, User, PlayCircle, Timer, Volume2, MessageCircle, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

const transcripts = [
  {
    id: 1,
    date: "2024-03-10",
    duration: "15:23",
    topic: "Product Inquiry",
    sentiment: "Positive",
    status: "Completed",
    audio: "https://example.com/audio1.mp3",
    transcription: "Customer: Hi, I'm having trouble with the checkout process.\n\nAgent: I'll be happy to help you with that. Could you describe what specific issue you're experiencing?\n\nCustomer: When I click on 'Complete Purchase,' nothing happens.\n\nAgent: Let me check that for you. Could you tell me which browser you're using?",
    metrics: {
      sentiment: "positive",
      customerSatisfaction: 85,
      speakingRatio: {
        agent: 60,
        customer: 40
      },
      tone: ["professional", "helpful", "concerned"],
      wordCount: 45
    }
  },
  {
    id: 2,
    date: "2024-03-10",
    duration: "08:45",
    topic: "Technical Support",
    sentiment: "Neutral",
    status: "In Review",
    audio: "https://example.com/audio2.mp3",
    transcription: "Customer: I'd like to know more about the premium features.\n\nAgent: I'll be glad to explain our premium features. Our premium plan includes advanced analytics, priority support, and custom integrations.",
    metrics: {
      sentiment: "neutral",
      customerSatisfaction: 75,
      speakingRatio: {
        agent: 70,
        customer: 30
      },
      tone: ["informative", "professional"],
      wordCount: 32
    }
  },
  {
    id: 3,
    date: "2024-03-09",
    duration: "12:10",
    topic: "Billing Question",
    sentiment: "Neutral",
    status: "Completed",
    audio: "https://example.com/audio3.mp3",
    transcription: "Customer: How do I reset my password?\n\nAgent: I can help you with that. First, click on the 'Forgot Password' link on the login page. You'll receive an email with instructions.",
    metrics: {
      sentiment: "neutral",
      customerSatisfaction: 90,
      speakingRatio: {
        agent: 65,
        customer: 35
      },
      tone: ["helpful", "clear"],
      wordCount: 28
    }
  }
];

const notifications = [
  {
    id: 1,
    title: "New transcript available",
    description: "Call #123 has been transcribed",
    time: "2 mins ago",
    unread: true,
  },
  {
    id: 2,
    title: "Analysis complete",
    description: "Sentiment analysis finished for call #456",
    time: "1 hour ago",
    unread: true,
  },
  {
    id: 3,
    title: "System update",
    description: "New features available in the dashboard",
    time: "2 hours ago",
    unread: false,
  }
];

const Transcripts = () => {
  const [selectedTranscript, setSelectedTranscript] = useState<typeof transcripts[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 flex flex-col bg-zinc-100">
          <div className="w-full bg-white border-b">
            <div className="flex items-center justify-between h-16 px-8">
              <h2 className="text-xl font-semibold">Transcripts</h2>
              <div className="flex items-center gap-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
                      <Bell className="w-5 h-5" />
                      <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80">
                    {notifications.map((notification) => (
                      <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-3 space-y-1 cursor-pointer">
                        <div className="flex items-center justify-between w-full">
                          <span className="font-medium">{notification.title}</span>
                          <span className="text-xs text-muted-foreground">{notification.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{notification.description}</p>
                        {notification.unread && (
                          <div className="flex items-center gap-1 text-xs text-blue-500">
                            <div className="w-1 h-1 rounded-full bg-blue-500" />
                            New
                          </div>
                        )}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                      <User className="w-5 h-5" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="cursor-pointer">
                      Account Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer text-red-600">
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>

          <div className="flex-1 p-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h1 className="text-3xl font-bold mb-2 animate-fade-down">Transcripts</h1>
                  <p className="text-muted-foreground animate-fade-up">Review and analyze your conversation transcripts</p>
                </div>
                <div className="w-80">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search transcripts..."
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>

              <Card className="divide-y bg-white">
                {transcripts.map((transcript, index) => (
                  <div
                    key={transcript.id}
                    onClick={() => {
                      setSelectedTranscript(transcript);
                      setIsModalOpen(true);
                    }}
                    className="p-6 cursor-pointer transition-colors hover:bg-gray-50"
                  >
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
                  </div>
                ))}
              </Card>
            </div>
          </div>
        </main>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <PlayCircle className="w-5 h-5" />
              Call #{selectedTranscript?.id}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex flex-col items-center p-3 bg-secondary/30 rounded-lg">
                <Timer className="w-5 h-5 mb-1 text-primary" />
                <span className="text-sm font-medium">{selectedTranscript?.duration}</span>
                <span className="text-xs text-muted-foreground">Duration</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-secondary/30 rounded-lg">
                <MessageCircle className="w-5 h-5 mb-1 text-primary" />
                <span className="text-sm font-medium">{selectedTranscript?.metrics.wordCount}</span>
                <span className="text-xs text-muted-foreground">Words</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-secondary/30 rounded-lg">
                <Volume2 className="w-5 h-5 mb-1 text-primary" />
                <span className={`text-sm font-medium capitalize`}>
                  {selectedTranscript?.metrics.sentiment}
                </span>
                <span className="text-xs text-muted-foreground">Sentiment</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-secondary/30 rounded-lg">
                <TrendingUp className="w-5 h-5 mb-1 text-primary" />
                <span className="text-sm font-medium">
                  {selectedTranscript?.metrics.speakingRatio.agent}% / {selectedTranscript?.metrics.speakingRatio.customer}%
                </span>
                <span className="text-xs text-muted-foreground">Agent/Customer Ratio</span>
              </div>
            </div>

            <div className="bg-secondary/30 p-3 rounded-lg">
              <h4 className="text-sm font-medium mb-2">Conversation Tone</h4>
              <div className="flex flex-wrap gap-2">
                {selectedTranscript?.metrics.tone.map((tone, index) => (
                  <span key={index} className="px-2 py-1 bg-primary/10 rounded-full text-xs text-primary">
                    {tone}
                  </span>
                ))}
              </div>
            </div>

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
    </SidebarProvider>
  );
};

export default Transcripts;
