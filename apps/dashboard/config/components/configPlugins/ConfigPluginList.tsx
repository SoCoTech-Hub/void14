"use client";
import { CompleteConfigPlugin } from "@/lib/db/schema/configPlugins";
import { trpc } from "@/lib/trpc/client";
import ConfigPluginModal from "./ConfigPluginModal";


export default function ConfigPluginList({ configPlugins }: { configPlugins: CompleteConfigPlugin[] }) {
  const { data: c } = trpc.configPlugins.getConfigPlugins.useQuery(undefined, {
    initialData: { configPlugins },
    refetchOnMount: false,
  });

  if (c.configPlugins.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {c.configPlugins.map((configPlugin) => (
        <ConfigPlugin configPlugin={configPlugin} key={configPlugin.id} />
      ))}
    </ul>
  );
}

const ConfigPlugin = ({ configPlugin }: { configPlugin: CompleteConfigPlugin }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{configPlugin.name}</div>
      </div>
      <ConfigPluginModal configPlugin={configPlugin} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No config plugins
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new config plugin.
      </p>
      <div className="mt-6">
        <ConfigPluginModal emptyState={true} />
      </div>
    </div>
  );
};

