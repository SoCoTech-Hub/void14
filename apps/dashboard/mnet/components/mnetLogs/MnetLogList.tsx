"use client";
import { CompleteMnetLog } from "@/lib/db/schema/mnetLogs";
import { trpc } from "@/lib/trpc/client";
import MnetLogModal from "./MnetLogModal";


export default function MnetLogList({ mnetLogs }: { mnetLogs: CompleteMnetLog[] }) {
  const { data: m } = trpc.mnetLogs.getMnetLogs.useQuery(undefined, {
    initialData: { mnetLogs },
    refetchOnMount: false,
  });

  if (m.mnetLogs.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {m.mnetLogs.map((mnetLog) => (
        <MnetLog mnetLog={mnetLog} key={mnetLog.mnetLog.id} />
      ))}
    </ul>
  );
}

const MnetLog = ({ mnetLog }: { mnetLog: CompleteMnetLog }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{mnetLog.mnetLog.action}</div>
      </div>
      <MnetLogModal mnetLog={mnetLog.mnetLog} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No mnet logs
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new mnet log.
      </p>
      <div className="mt-6">
        <MnetLogModal emptyState={true} />
      </div>
    </div>
  );
};

