"use client";
import { CompletePortfolioInstanceConfig } from "@soco/portfolio-db/schema/portfolioInstanceConfigs";
import { trpc } from "@/lib/trpc/client";
import PortfolioInstanceConfigModal from "./PortfolioInstanceConfigModal";


export default function PortfolioInstanceConfigList({ portfolioInstanceConfigs }: { portfolioInstanceConfigs: CompletePortfolioInstanceConfig[] }) {
  const { data: p } = trpc.portfolioInstanceConfigs.getPortfolioInstanceConfigs.useQuery(undefined, {
    initialData: { portfolioInstanceConfigs },
    refetchOnMount: false,
  });

  if (p.portfolioInstanceConfigs.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {p.portfolioInstanceConfigs.map((portfolioInstanceConfig) => (
        <PortfolioInstanceConfig portfolioInstanceConfig={portfolioInstanceConfig} key={portfolioInstanceConfig.portfolioInstanceConfig.id} />
      ))}
    </ul>
  );
}

const PortfolioInstanceConfig = ({ portfolioInstanceConfig }: { portfolioInstanceConfig: CompletePortfolioInstanceConfig }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{portfolioInstanceConfig.portfolioInstanceConfig.portfolioInstanceId}</div>
      </div>
      <PortfolioInstanceConfigModal portfolioInstanceConfig={portfolioInstanceConfig.portfolioInstanceConfig} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No portfolio instance configs
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new portfolio instance config.
      </p>
      <div className="mt-6">
        <PortfolioInstanceConfigModal emptyState={true} />
      </div>
    </div>
  );
};

