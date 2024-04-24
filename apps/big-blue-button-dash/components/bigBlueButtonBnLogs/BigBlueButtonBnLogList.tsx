"use client";
import { CompleteBigBlueButtonBnLog } from "@/lib/db/schema/bigBlueButtonBnLogs";
import { trpc } from "@/lib/trpc/client";
import BigBlueButtonBnLogModal from "./BigBlueButtonBnLogModal";


export default function BigBlueButtonBnLogList({ bigBlueButtonBnLogs }: { bigBlueButtonBnLogs: CompleteBigBlueButtonBnLog[] }) {
  const { data: b } = trpc.bigBlueButtonBnLogs.getBigBlueButtonBnLogs.useQuery(undefined, {
    initialData: { bigBlueButtonBnLogs },
    refetchOnMount: false,
  });

  if (b.bigBlueButtonBnLogs.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {b.bigBlueButtonBnLogs.map((bigBlueButtonBnLog) => (
        <BigBlueButtonBnLog bigBlueButtonBnLog={bigBlueButtonBnLog} key={bigBlueButtonBnLog.bigBlueButtonBnLog.id} />
      ))}
    </ul>
  );
}

const BigBlueButtonBnLog = ({ bigBlueButtonBnLog }: { bigBlueButtonBnLog: CompleteBigBlueButtonBnLog }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{bigBlueButtonBnLog.bigBlueButtonBnLog.bigBlueButtonBnId}</div>
      </div>
      <BigBlueButtonBnLogModal bigBlueButtonBnLog={bigBlueButtonBnLog.bigBlueButtonBnLog} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No big blue button bn logs
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new big blue button bn log.
      </p>
      <div className="mt-6">
        <BigBlueButtonBnLogModal emptyState={true} />
      </div>
    </div>
  );
};

