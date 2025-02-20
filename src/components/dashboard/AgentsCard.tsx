
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
    score: 4.6,
    lastTranscript: {
      id: 1002,
      audio: "https://example.com/audio2.mp3",
      transcription: "Customer: I'm having trouble with my login.\n\nMichael: Let me help you with that. Can you tell me what happens when you try to log in?\n\nCustomer: It says 'invalid credentials' but I'm sure my password is correct.\n\nMichael: I'll help you reset your password to resolve this issue.",
      duration: "4:15",
      timestamp: "3 hours ago",
      metrics: {
        sentiment: "neutral",
        customerSatisfaction: 85,
        speakingRatio: {
          agent: 55,
          customer: 45
        },
        tone: ["patient", "technical", "clear"],
        wordCount: 52
      }
    }
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
    score: 4.9,
    lastTranscript: {
      id: 1003,
      audio: "https://example.com/audio3.mp3",
      transcription: "Customer: I want to thank you for your excellent service!\n\nEmma: That's very kind of you! I'm glad I could help. Is there anything else you need assistance with?\n\nCustomer: No, that's all. Have a great day!\n\nEmma: You too! Thank you for choosing our service.",
      duration: "3:45",
      timestamp: "1 hour ago",
      metrics: {
        sentiment: "positive",
        customerSatisfaction: 98,
        speakingRatio: {
          agent: 50,
          customer: 50
        },
        tone: ["friendly", "appreciative", "positive"],
        wordCount: 45
      }
    }
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
    score: 4.5,
    lastTranscript: {
      id: 1004,
      audio: "https://example.com/audio4.mp3",
      transcription: "Customer: My shipment is delayed. Can you help?\n\nJames: Of course! Let me check the status for you. Could you provide your tracking number?\n\nCustomer: It's TRK789.\n\nJames: I see the delay. Let me contact our shipping partner to expedite this.",
      duration: "6:10",
      timestamp: "4 hours ago",
      metrics: {
        sentiment: "neutral",
        customerSatisfaction: 88,
        speakingRatio: {
          agent: 65,
          customer: 35
        },
        tone: ["proactive", "solution-oriented", "professional"],
        wordCount: 42
      }
    }
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
