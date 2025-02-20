
import { PlayCircle, Timer, Volume2, MessageCircle, TrendingUp } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

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

type TranscriptDialogProps = {
  transcript: Transcript | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

export function TranscriptDialog({ transcript, isOpen, onOpenChange }: TranscriptDialogProps) {
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

  if (!transcript) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <PlayCircle className="w-5 h-5" />
            Call #{transcript.id}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col items-center p-3 bg-secondary/30 rounded-lg">
              <Timer className="w-5 h-5 mb-1 text-primary" />
              <span className="text-sm font-medium">{transcript.duration}</span>
              <span className="text-xs text-muted-foreground">Duration</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-secondary/30 rounded-lg">
              <MessageCircle className="w-5 h-5 mb-1 text-primary" />
              <span className="text-sm font-medium">{transcript.metrics.wordCount}</span>
              <span className="text-xs text-muted-foreground">Words</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-secondary/30 rounded-lg">
              <Volume2 className="w-5 h-5 mb-1 text-primary" />
              <Badge variant="secondary" className={getSentimentStyles(transcript.metrics.sentiment)}>
                {capitalizeFirstLetter(transcript.metrics.sentiment)}
              </Badge>
              <span className="text-xs text-muted-foreground">Sentiment</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-secondary/30 rounded-lg">
              <TrendingUp className="w-5 h-5 mb-1 text-primary" />
              <span className="text-sm font-medium">
                {transcript.metrics.speakingRatio.agent}% / {transcript.metrics.speakingRatio.customer}%
              </span>
              <span className="text-xs text-muted-foreground">Agent/Customer Ratio</span>
            </div>
          </div>

          <div className="bg-secondary/30 p-3 rounded-lg">
            <h4 className="text-sm font-medium mb-2">Conversation Tone</h4>
            <div className="flex flex-wrap gap-2">
              {transcript.metrics.tone.map((tone, index) => (
                <span key={index} className="px-2 py-1 bg-primary/10 rounded-full text-xs text-primary">
                  {tone}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-secondary/50 p-4 rounded-lg">
            <audio controls className="w-full">
              <source src={transcript.audio} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>

          <div className="max-h-[400px] overflow-y-auto">
            <h3 className="font-semibold mb-2">Transcription</h3>
            <div className="whitespace-pre-line text-sm text-muted-foreground">
              {transcript.transcription}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
