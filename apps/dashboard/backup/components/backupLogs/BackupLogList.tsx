"use client";
import { CompleteBackupLog } from "@/lib/db/schema/backupLogs";
import { trpc } from "@/lib/trpc/client";
import BackupLogModal from "./BackupLogModal";


export default function BackupLogList({ backupLogs }: { backupLogs: CompleteBackupLog[] }) {
  const { data: b } = trpc.backupLogs.getBackupLogs.useQuery(undefined, {
    initialData: { backupLogs },
    refetchOnMount: false,
  });

  if (b.backupLogs.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {b.backupLogs.map((backupLog) => (
        <BackupLog backupLog={backupLog} key={backupLog.id} />
      ))}
    </ul>
  );
}

const BackupLog = ({ backupLog }: { backupLog: CompleteBackupLog }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{backupLog.backupId}</div>
      </div>
      <BackupLogModal backupLog={backupLog} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No backup logs
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new backup log.
      </p>
      <div className="mt-6">
        <BackupLogModal emptyState={true} />
      </div>
    </div>
  );
};

