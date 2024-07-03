"use client";
import { CompleteRepositoryInstanceConfig } from "@/lib/db/schema/repositoryInstanceConfigs";
import { trpc } from "@/lib/trpc/client";
import RepositoryInstanceConfigModal from "./RepositoryInstanceConfigModal";


export default function RepositoryInstanceConfigList({ repositoryInstanceConfigs }: { repositoryInstanceConfigs: CompleteRepositoryInstanceConfig[] }) {
  const { data: r } = trpc.repositoryInstanceConfigs.getRepositoryInstanceConfigs.useQuery(undefined, {
    initialData: { repositoryInstanceConfigs },
    refetchOnMount: false,
  });

  if (r.repositoryInstanceConfigs.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {r.repositoryInstanceConfigs.map((repositoryInstanceConfig) => (
        <RepositoryInstanceConfig repositoryInstanceConfig={repositoryInstanceConfig} key={repositoryInstanceConfig.repositoryInstanceConfig.id} />
      ))}
    </ul>
  );
}

const RepositoryInstanceConfig = ({ repositoryInstanceConfig }: { repositoryInstanceConfig: CompleteRepositoryInstanceConfig }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{repositoryInstanceConfig.repositoryInstanceConfig.repositoryInstanceId}</div>
      </div>
      <RepositoryInstanceConfigModal repositoryInstanceConfig={repositoryInstanceConfig.repositoryInstanceConfig} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No repository instance configs
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new repository instance config.
      </p>
      <div className="mt-6">
        <RepositoryInstanceConfigModal emptyState={true} />
      </div>
    </div>
  );
};

