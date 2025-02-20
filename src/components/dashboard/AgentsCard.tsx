import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ThumbsUp, Clock, Star } from "lucide-react";
import { AgentDetailsDialog } from "./AgentDetailsDialog";

export interface Agent {
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

const generateAgents = (count: number): Agent[] => {
  const firstNames = ["Sarah", "Michael", "Emma", "James", "David", "Lisa", "John", "Emily", "Robert", "Jessica"];
  const lastNames = ["Johnson", "Chen", "Davis", "Wilson", "Brown", "Taylor", "Smith", "Anderson", "Martinez", "Thompson"];
  
  return Array.from({ length: count }, (_, index) => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const name = `${firstName} ${lastName}`;
    
    return {
      id: index + 1,
      name,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
      callCount: Math.floor(Math.random() * 100) + 50,
      sentiment: {
        positive: Math.floor(Math.random() * 30) + 60,
        neutral: Math.floor(Math.random() * 20) + 10,
        negative: Math.floor(Math.random() * 10)
      },
      totalCallDuration: `${Math.floor(Math.random() * 40) + 10}h ${Math.floor(Math.random() * 60)}m`,
      score: Number((Math.random() * (5 - 3.5) + 3.5).toFixed(1)),
      lastTranscript: {
        id: 1000 + index,
        audio: "https://example.com/audio.mp3",
        transcription: `Customer: Hi, I need help.\n\n${name}: I'd be happy to help you. What seems to be the issue?\n\nCustomer: Thank you for your assistance.\n\n${name}: You're welcome! Is there anything else I can help you with?`,
        duration: `${Math.floor(Math.random() * 10) + 2}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
        timestamp: `${Math.floor(Math.random() * 12) + 1} hours ago`,
        metrics: {
          sentiment: ["positive", "neutral", "negative"][Math.floor(Math.random() * 3)] as "positive" | "neutral" | "negative",
          customerSatisfaction: Math.floor(Math.random() * 30) + 70,
          speakingRatio: {
            agent: Math.floor(Math.random() * 20) + 50,
            customer: Math.floor(Math.random() * 20) + 30
          },
          tone: ["helpful", "professional", "empathetic", "friendly", "patient", "technical"]
            .sort(() => Math.random() - 0.5)
            .slice(0, 3),
          wordCount: Math.floor(Math.random() * 100) + 30
        }
      }
    };
  });
};

const agents: Agent[] = generateAgents(55);

export function AgentsCard() {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

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
                setSelectedAgent(agent);
                setIsModalOpen(true);
              }}
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold">
                {getInitials(agent.name)}
              </div>
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

      <AgentDetailsDialog 
        agent={selectedAgent}
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </>
  );
}
