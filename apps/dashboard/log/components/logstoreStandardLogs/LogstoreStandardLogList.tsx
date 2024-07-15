"use client";
import { CompleteLogstoreStandardLog } from "@soco/log-db/schema/logstoreStandardLogs";
import { trpc } from "@/lib/trpc/client";
import LogstoreStandardLogModal from "./LogstoreStandardLogModal";


export default function LogstoreStandardLogList({ logstoreStandardLogs }: { logstoreStandardLogs: CompleteLogstoreStandardLog[] }) {
  const { data: l } = trpc.logstoreStandardLogs.getLogstoreStandardLogs.useQuery(undefined, {
    initialData: { logstoreStandardLogs },
    refetchOnMount: false,
  });

  if (l.logstoreStandardLogs.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {l.logstoreStandardLogs.map((logstoreStandardLog) => (
        <LogstoreStandardLog logstoreStandardLog={logstoreStandardLog} key={logstoreStandardLog.id} />
      ))}
    </ul>
  );
}

const LogstoreStandardLog = ({ logstoreStandardLog }: { logstoreStandardLog: CompleteLogstoreStandardLog }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{logstoreStandardLog.action}</div>
      </div>
      <LogstoreStandardLogModal logstoreStandardLog={logstoreStandardLog} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No logstore standard logs
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new logstore standard log.
      </p>
      <div className="mt-6">
        <LogstoreStandardLogModal emptyState={true} />
      </div>
    </div>
  );
};

