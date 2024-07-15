"use client";
import { CompletePortfolioInstance } from "@soco/portfolio-db/schema/portfolioInstances";
import { trpc } from "@/lib/trpc/client";
import PortfolioInstanceModal from "./PortfolioInstanceModal";


export default function PortfolioInstanceList({ portfolioInstances }: { portfolioInstances: CompletePortfolioInstance[] }) {
  const { data: p } = trpc.portfolioInstances.getPortfolioInstances.useQuery(undefined, {
    initialData: { portfolioInstances },
    refetchOnMount: false,
  });

  if (p.portfolioInstances.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {p.portfolioInstances.map((portfolioInstance) => (
        <PortfolioInstance portfolioInstance={portfolioInstance} key={portfolioInstance.id} />
      ))}
    </ul>
  );
}

const PortfolioInstance = ({ portfolioInstance }: { portfolioInstance: CompletePortfolioInstance }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{portfolioInstance.name}</div>
      </div>
      <PortfolioInstanceModal portfolioInstance={portfolioInstance} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No portfolio instances
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new portfolio instance.
      </p>
      <div className="mt-6">
        <PortfolioInstanceModal emptyState={true} />
      </div>
    </div>
  );
};

