"use client";
import { CompleteConfig } from "@/lib/db/schema/configs";
import { trpc } from "@/lib/trpc/client";
import ConfigModal from "./ConfigModal";


export default function ConfigList({ configs }: { configs: CompleteConfig[] }) {
  const { data: c } = trpc.configs.getConfigs.useQuery(undefined, {
    initialData: { configs },
    refetchOnMount: false,
  });

  if (c.configs.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {c.configs.map((config) => (
        <Config config={config} key={config.id} />
      ))}
    </ul>
  );
}

const Config = ({ config }: { config: CompleteConfig }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{config.name}</div>
      </div>
      <ConfigModal config={config} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No configs
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new config.
      </p>
      <div className="mt-6">
        <ConfigModal emptyState={true} />
      </div>
    </div>
  );
};

