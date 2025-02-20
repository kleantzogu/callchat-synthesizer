import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ThumbsUp, Clock, Star } from "lucide-react";
import { TranscriptDialog } from "./TranscriptDialog";

interface Agent {
  id: number;
  name: string;
  avatar: string;
  callCount: number;
  sentiment: {
    positive: number;
    neutral: number;
    negative: number;
  };
  totalCallDuration: string;
  score: number;
  lastTranscript: {
    id: number;
    audio: string;
    transcription: string;
    duration: string;
    timestamp: string;
    metrics: {
      sentiment: 'positive' | 'neutral' | 'negative';
      customerSatisfaction: number;
      speakingRatio: {
        agent: number;
        customer: number;
      };
      tone: string[];
      wordCount: number;
    };
  };
}

const agents: Agent[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    callCount: 145,
    sentiment: {
      positive: 75,
      neutral: 20,
      negative: 5
    },
    totalCallDuration: "32h 45m",
    score: 4.8,
    lastTranscript: {
      id: 1001,
      audio: "https://example.com/audio1.mp3",
      transcription: "Customer: Hi, I need help with my order.\n\nSarah: I'd be happy to help you with that. Could you please provide your order number?\n\nCustomer: Yes, it's ORDER123.\n\nSarah: Thank you, I can see your order here. What seems to be the issue?",
      duration: "5:23",
      timestamp: "2 hours ago",
      metrics: {
        sentiment: "positive",
        customerSatisfaction: 95,
        speakingRatio: {
          agent: 60,
          customer: 40
        },
        tone: ["helpful", "professional", "empathetic"],
        wordCount: 48
      }
    }
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    callCount: 128,
    sentiment: {
      positive: 68,
      neutral: 25,
      negative: 7
    },
    totalCallDuration: "28h 15m",
    score: 4.6
  },
  {
    id: 3,
    name: "Emma Davis",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    callCount: 156,
    sentiment: {
      positive: 82,
      neutral: 15,
      negative: 3
    },
    totalCallDuration: "35h 20m",
    score: 4.9
  },
  {
    id: 4,
    name: "James Wilson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    callCount: 112,
    sentiment: {
      positive: 70,
      neutral: 22,
      negative: 8
    },
    totalCallDuration: "25h 30m",
    score: 4.5
  }
];

export function AgentsCard() {
  const [selectedTranscript, setSelectedTranscript] = useState<Agent["lastTranscript"] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Card className="p-6 shadow-sm transition-shadow hover:shadow-md animate-fade-up bg-white">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Top Performing Agents</h2>
          <a href="/agents" className="text-sm text-primary hover:underline">
            View all
          </a>
        </div>
        <div className="space-y-6">
          {agents.map((agent) => (
            <div 
              key={agent.id} 
              className="flex items-center gap-4 p-3 rounded-lg transition-colors hover:bg-secondary/50 cursor-pointer"
              onClick={() => {
                setSelectedTranscript(agent.lastTranscript);
                setIsModalOpen(true);
              }}
            >
              <img
                src={agent.avatar}
                alt={agent.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium truncate">{agent.name}</h3>
                <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{agent.sentiment.positive}%</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{agent.totalCallDuration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span>{agent.score}</span>
                  </div>
                </div>
              </div>
              <div className="text-sm font-medium">
                {agent.callCount} calls
              </div>
            </div>
          ))}
        </div>
      </Card>

      <TranscriptDialog 
        transcript={selectedTranscript}
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </>
  );
}
