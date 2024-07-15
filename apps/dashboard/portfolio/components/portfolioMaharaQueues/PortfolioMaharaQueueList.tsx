"use client";
import { CompletePortfolioMaharaQueue } from "@soco/portfolio-db/schema/portfolioMaharaQueues";
import { trpc } from "@/lib/trpc/client";
import PortfolioMaharaQueueModal from "./PortfolioMaharaQueueModal";


export default function PortfolioMaharaQueueList({ portfolioMaharaQueues }: { portfolioMaharaQueues: CompletePortfolioMaharaQueue[] }) {
  const { data: p } = trpc.portfolioMaharaQueues.getPortfolioMaharaQueues.useQuery(undefined, {
    initialData: { portfolioMaharaQueues },
    refetchOnMount: false,
  });

  if (p.portfolioMaharaQueues.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {p.portfolioMaharaQueues.map((portfolioMaharaQueue) => (
        <PortfolioMaharaQueue portfolioMaharaQueue={portfolioMaharaQueue} key={portfolioMaharaQueue.portfolioMaharaQueue.id} />
      ))}
    </ul>
  );
}

const PortfolioMaharaQueue = ({ portfolioMaharaQueue }: { portfolioMaharaQueue: CompletePortfolioMaharaQueue }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{portfolioMaharaQueue.portfolioMaharaQueue.token}</div>
      </div>
      <PortfolioMaharaQueueModal portfolioMaharaQueue={portfolioMaharaQueue.portfolioMaharaQueue} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No portfolio mahara queues
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new portfolio mahara queue.
      </p>
      <div className="mt-6">
        <PortfolioMaharaQueueModal emptyState={true} />
      </div>
    </div>
  );
};

