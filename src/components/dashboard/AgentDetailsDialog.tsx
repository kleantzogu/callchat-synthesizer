
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ThumbsUp, Clock, Star, Phone, BarChart3, MessageSquare } from "lucide-react";
import type { Agent } from "./AgentsCard";

type AgentDetailsDialogProps = {
  agent: Agent | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

export function AgentDetailsDialog({ agent, isOpen, onOpenChange }: AgentDetailsDialogProps) {
  if (!agent) return null;

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold">
              {getInitials(agent.name)}
            </div>
            <div>
              <h2 className="text-xl font-semibold">{agent.name}</h2>
              <p className="text-sm text-muted-foreground mt-1">Agent Profile</p>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {/* Performance Metrics */}
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center p-4 bg-secondary/30 rounded-lg">
              <Phone className="w-5 h-5 mb-2 text-primary" />
              <span className="text-lg font-medium">{agent.callCount}</span>
              <span className="text-sm text-muted-foreground">Total Calls</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-secondary/30 rounded-lg">
              <Clock className="w-5 h-5 mb-2 text-primary" />
              <span className="text-lg font-medium">{agent.totalCallDuration}</span>
              <span className="text-sm text-muted-foreground">Call Duration</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-secondary/30 rounded-lg">
              <Star className="w-5 h-5 mb-2 text-yellow-400" />
              <span className="text-lg font-medium">{agent.score}</span>
              <span className="text-sm text-muted-foreground">Average Rating</span>
            </div>
          </div>

          {/* Sentiment Analysis */}
          <div className="bg-secondary/30 p-4 rounded-lg">
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Sentiment Distribution
            </h3>
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-green-600">Positive</span>
                  <span>{agent.sentiment.positive}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: `${agent.sentiment.positive}%` }}
                  />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-yellow-600">Neutral</span>
                  <span>{agent.sentiment.neutral}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-yellow-500 rounded-full"
                    style={{ width: `${agent.sentiment.neutral}%` }}
                  />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-red-600">Negative</span>
                  <span>{agent.sentiment.negative}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-red-500 rounded-full"
                    style={{ width: `${agent.sentiment.negative}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Latest Call */}
          <div className="bg-secondary/30 p-4 rounded-lg">
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Latest Call Details
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Duration:</span>
                <span>{agent.lastTranscript.duration}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Time:</span>
                <span>{agent.lastTranscript.timestamp}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Customer Satisfaction:</span>
                <span>{agent.lastTranscript.metrics.customerSatisfaction}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Speaking Ratio:</span>
                <span>Agent {agent.lastTranscript.metrics.speakingRatio.agent}% / Customer {agent.lastTranscript.metrics.speakingRatio.customer}%</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
