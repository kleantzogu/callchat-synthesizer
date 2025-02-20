
import { AgentsCard } from "@/components/dashboard/AgentsCard";

export default function Agents() {
  return (
    <div className="container py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold tracking-tight">Agents</h1>
      </div>
      <AgentsCard />
    </div>
  );
}
