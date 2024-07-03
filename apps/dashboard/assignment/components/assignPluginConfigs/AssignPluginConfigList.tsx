"use client";
import { CompleteAssignPluginConfig } from "@/lib/db/schema/assignPluginConfigs";
import { trpc } from "@/lib/trpc/client";
import AssignPluginConfigModal from "./AssignPluginConfigModal";


export default function AssignPluginConfigList({ assignPluginConfigs }: { assignPluginConfigs: CompleteAssignPluginConfig[] }) {
  const { data: a } = trpc.assignPluginConfigs.getAssignPluginConfigs.useQuery(undefined, {
    initialData: { assignPluginConfigs },
    refetchOnMount: false,
  });

  if (a.assignPluginConfigs.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {a.assignPluginConfigs.map((assignPluginConfig) => (
        <AssignPluginConfig assignPluginConfig={assignPluginConfig} key={assignPluginConfig.assignPluginConfig.id} />
      ))}
    </ul>
  );
}

const AssignPluginConfig = ({ assignPluginConfig }: { assignPluginConfig: CompleteAssignPluginConfig }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{assignPluginConfig.assignPluginConfig.assignmentId}</div>
      </div>
      <AssignPluginConfigModal assignPluginConfig={assignPluginConfig.assignPluginConfig} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No assign plugin configs
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new assign plugin config.
      </p>
      <div className="mt-6">
        <AssignPluginConfigModal emptyState={true} />
      </div>
    </div>
  );
};

