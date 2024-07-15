"use client";
import { CompleteConfigLog } from "@soco/config-db/schema/configLogs";
import { trpc } from "@/lib/trpc/client";
import ConfigLogModal from "./ConfigLogModal";


export default function ConfigLogList({ configLogs }: { configLogs: CompleteConfigLog[] }) {
  const { data: c } = trpc.configLogs.getConfigLogs.useQuery(undefined, {
    initialData: { configLogs },
    refetchOnMount: false,
  });

  if (c.configLogs.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {c.configLogs.map((configLog) => (
        <ConfigLog configLog={configLog} key={configLog.id} />
      ))}
    </ul>
  );
}

const ConfigLog = ({ configLog }: { configLog: CompleteConfigLog }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{configLog.name}</div>
      </div>
      <ConfigLogModal configLog={configLog} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No config logs
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new config log.
      </p>
      <div className="mt-6">
        <ConfigLogModal emptyState={true} />
      </div>
    </div>
  );
};

