
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TranscriptDialog } from "./TranscriptDialog";

type Transcript = {
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

const transcripts: Transcript[] = [
  {
    id: 1,
    audio: "https://example.com/audio1.mp3",
    transcription: "Customer: Hi, I'm having trouble with the checkout process.\n\nAgent: I'll be happy to help you with that. Could you describe what specific issue you're experiencing?\n\nCustomer: When I click on 'Complete Purchase,' nothing happens.\n\nAgent: Let me check that for you. Could you tell me which browser you're using?",
    duration: "2:15",
    timestamp: "2 mins ago",
    metrics: {
      sentiment: "neutral",
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
    audio: "https://example.com/audio2.mp3",
    transcription: "Customer: I'd like to know more about the premium features.\n\nAgent: I'll be glad to explain our premium features. Our premium plan includes advanced analytics, priority support, and custom integrations.",
    duration: "1:45",
    timestamp: "5 mins ago",
    metrics: {
      sentiment: "positive",
      customerSatisfaction: 95,
      speakingRatio: {
        agent: 70,
        customer: 30
      },
      tone: ["informative", "enthusiastic", "professional"],
      wordCount: 32
    }
  },
  {
    id: 3,
    audio: "https://example.com/audio3.mp3",
    transcription: "Customer: How do I reset my password?\n\nAgent: I can help you with that. First, click on the 'Forgot Password' link on the login page. You'll receive an email with instructions.",
    duration: "1:30",
    timestamp: "8 mins ago",
    metrics: {
      sentiment: "neutral",
      customerSatisfaction: 90,
      speakingRatio: {
        agent: 65,
        customer: 35
      },
      tone: ["helpful", "clear", "concise"],
      wordCount: 28
    }
  }
];

export function RecentTranscripts() {
  const [selectedTranscript, setSelectedTranscript] = useState<Transcript | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getSentimentStyles = (sentiment: 'positive' | 'neutral' | 'negative') => {
    switch (sentiment) {
      case 'positive':
        return 'bg-green-100 text-green-800 hover:bg-green-100';
      case 'neutral':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100';
      case 'negative':
        return 'bg-red-100 text-red-800 hover:bg-red-100';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
    }
  };

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <>
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
                <Badge variant="secondary" className={getSentimentStyles(transcript.metrics.sentiment)}>
                  {capitalizeFirstLetter(transcript.metrics.sentiment)}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{transcript.transcription.slice(0, 100)}...</p>
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
