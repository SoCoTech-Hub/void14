"use client";
import { CompleteBackupController } from "@/lib/db/schema/backupControllers";
import { trpc } from "@/lib/trpc/client";
import BackupControllerModal from "./BackupControllerModal";


export default function BackupControllerList({ backupControllers }: { backupControllers: CompleteBackupController[] }) {
  const { data: b } = trpc.backupControllers.getBackupControllers.useQuery(undefined, {
    initialData: { backupControllers },
    refetchOnMount: false,
  });

  if (b.backupControllers.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {b.backupControllers.map((backupController) => (
        <BackupController backupController={backupController} key={backupController.id} />
      ))}
    </ul>
  );
}

const BackupController = ({ backupController }: { backupController: CompleteBackupController }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{backupController.backupId}</div>
      </div>
      <BackupControllerModal backupController={backupController} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No backup controllers
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new backup controller.
      </p>
      <div className="mt-6">
        <BackupControllerModal emptyState={true} />
      </div>
    </div>
  );
};

