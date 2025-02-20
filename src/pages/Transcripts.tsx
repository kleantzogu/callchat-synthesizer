import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { MessageSquare, Search, Bell, User, PlayCircle, Timer, Volume2, MessageCircle, TrendingUp, CheckCircle, MinusCircle, AlertCircle, XCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

const transcripts = Array.from({ length: 55 }, (_, index) => {
  const id = index + 1;
  const sentiments = ["Positive", "Neutral", "Bad", "Very Bad"];
  const topics = ["Product Inquiry", "Technical Support", "Billing Question"];
  const statuses = ["Completed", "In Review"];
  
  return {
    id,
    date: "2024-03-" + String(Math.floor(Math.random() * 30) + 1).padStart(2, '0'),
    duration: `${Math.floor(Math.random() * 30) + 1}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
    topic: topics[Math.floor(Math.random() * topics.length)],
    sentiment: sentiments[Math.floor(Math.random() * sentiments.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    audio: `https://example.com/audio${id}.mp3`,
    transcription: "Customer: Sample conversation #" + id + "\n\nAgent: Sample response #" + id,
    metrics: {
      sentiment: sentiments[Math.floor(Math.random() * sentiments.length)].toLowerCase().replace(' ', '-'),
      customerSatisfaction: Math.floor(Math.random() * 60) + 40,
      speakingRatio: {
        agent: Math.floor(Math.random() * 30) + 50,
        customer: Math.floor(Math.random() * 30) + 20
      },
      tone: ["professional", "helpful"],
      wordCount: Math.floor(Math.random() * 100) + 20
    }
  };
});

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

const ITEMS_PER_PAGE = 10;

const Transcripts = () => {
  const [selectedTranscript, setSelectedTranscript] = useState<typeof transcripts[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [supportType, setSupportType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const isMobile = useIsMobile();

  const filteredTranscripts = transcripts.filter(transcript => {
    const matchesSentiment = activeTab === "all" || 
      (activeTab === "neutral" && transcript.sentiment === "Neutral") ||
      (activeTab === "positive" && transcript.sentiment === "Positive") ||
      (activeTab === "bad" && transcript.sentiment === "Bad") ||
      (activeTab === "very-bad" && transcript.sentiment === "Very Bad");

    const matchesSupportType = supportType === "all" || 
      transcript.topic === supportType;

    return matchesSentiment && matchesSupportType;
  });

  const totalPages = Math.ceil(filteredTranscripts.length / ITEMS_PER_PAGE);
  const paginatedTranscripts = filteredTranscripts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const getSentimentStyles = (sentiment: string) => {
    switch (sentiment) {
      case 'Positive':
        return 'bg-green-100 text-green-800';
      case 'Neutral':
        return 'bg-yellow-100 text-yellow-800';
      case 'Bad':
        return 'bg-orange-100 text-orange-800';
      case 'Very Bad':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        {!isMobile && <AppSidebar />}
        <main className="flex-1 flex flex-col bg-zinc-100">
          <div className="w-full bg-white border-b">
            <div className="flex items-center justify-between h-16 px-4 sm:px-8">
              <h2 className="text-xl font-semibold">Transcripts</h2>
              {!isMobile && (
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
              )}
            </div>
          </div>

          <div className="flex-1 p-8">
            <div className="max-w-7xl mx-auto space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold mb-2 animate-fade-down">Transcripts</h1>
                  <p className="text-muted-foreground animate-fade-up">Review and analyze your conversation transcripts</p>
                </div>
                <div className="flex gap-4">
                  <Select value={supportType} onValueChange={setSupportType}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Support Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="Product Inquiry">Product Inquiry</SelectItem>
                      <SelectItem value="Technical Support">Technical Support</SelectItem>
                      <SelectItem value="Billing Question">Billing Questions</SelectItem>
                    </SelectContent>
                  </Select>
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

              <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-5 lg:w-[500px]">
                  <TabsTrigger value="all" className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    All
                  </TabsTrigger>
                  <TabsTrigger value="positive" className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Positive
                  </TabsTrigger>
                  <TabsTrigger value="neutral" className="flex items-center gap-2">
                    <MinusCircle className="w-4 h-4 text-yellow-500" />
                    Neutral
                  </TabsTrigger>
                  <TabsTrigger value="bad" className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-orange-500" />
                    Bad
                  </TabsTrigger>
                  <TabsTrigger value="very-bad" className="flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-red-500" />
                    Very Bad
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <Card className="divide-y bg-white">
                {paginatedTranscripts.map((transcript, index) => (
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
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getSentimentStyles(transcript.sentiment)}`}>
                          {transcript.sentiment}
                        </span>
                        <p className="text-sm text-muted-foreground mt-2">{transcript.status}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </Card>

              {totalPages > 1 && (
                <div className="flex items-center justify-between pt-4">
                  <div className="text-sm text-muted-foreground">
                    Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, filteredTranscripts.length)} of {filteredTranscripts.length} results
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-8 h-8 rounded-lg ${
                          currentPage === page
                            ? "bg-primary text-white"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
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
