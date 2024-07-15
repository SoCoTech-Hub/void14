"use client";
import { CompletePortfolioTempdata } from "@soco/portfolio-db/schema/portfolioTempdatas";
import { trpc } from "@/lib/trpc/client";
import PortfolioTempdataModal from "./PortfolioTempdataModal";


export default function PortfolioTempdataList({ portfolioTempdatas }: { portfolioTempdatas: CompletePortfolioTempdata[] }) {
  const { data: p } = trpc.portfolioTempdatas.getPortfolioTempdatas.useQuery(undefined, {
    initialData: { portfolioTempdatas },
    refetchOnMount: false,
  });

  if (p.portfolioTempdatas.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {p.portfolioTempdatas.map((portfolioTempdata) => (
        <PortfolioTempdata portfolioTempdata={portfolioTempdata} key={portfolioTempdata.portfolioTempdata.id} />
      ))}
    </ul>
  );
}

const PortfolioTempdata = ({ portfolioTempdata }: { portfolioTempdata: CompletePortfolioTempdata }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{portfolioTempdata.portfolioTempdata.data}</div>
      </div>
      <PortfolioTempdataModal portfolioTempdata={portfolioTempdata.portfolioTempdata} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No portfolio tempdatas
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new portfolio tempdata.
      </p>
      <div className="mt-6">
        <PortfolioTempdataModal emptyState={true} />
      </div>
    </div>
  );
};

