"use client";
import { CompletePortfolioLog } from "@soco/portfolio-db/schema/portfolioLogs";
import { trpc } from "@/lib/trpc/client";
import PortfolioLogModal from "./PortfolioLogModal";


export default function PortfolioLogList({ portfolioLogs }: { portfolioLogs: CompletePortfolioLog[] }) {
  const { data: p } = trpc.portfolioLogs.getPortfolioLogs.useQuery(undefined, {
    initialData: { portfolioLogs },
    refetchOnMount: false,
  });

  if (p.portfolioLogs.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {p.portfolioLogs.map((portfolioLog) => (
        <PortfolioLog portfolioLog={portfolioLog} key={portfolioLog.portfolioLog.id} />
      ))}
    </ul>
  );
}

const PortfolioLog = ({ portfolioLog }: { portfolioLog: CompletePortfolioLog }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{portfolioLog.portfolioLog.callerClass}</div>
      </div>
      <PortfolioLogModal portfolioLog={portfolioLog.portfolioLog} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No portfolio logs
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new portfolio log.
      </p>
      <div className="mt-6">
        <PortfolioLogModal emptyState={true} />
      </div>
    </div>
  );
};

