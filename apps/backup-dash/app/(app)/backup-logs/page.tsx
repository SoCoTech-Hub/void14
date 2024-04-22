import BackupLogList from "@/components/backupLogs/BackupLogList";
import NewBackupLogModal from "@/components/backupLogs/BackupLogModal";
import { api } from "@/lib/trpc/api";

export default async function BackupLogs() {
  const { backupLogs } = await api.backupLogs.getBackupLogs.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Backup Logs</h1>
        <NewBackupLogModal />
      </div>
      <BackupLogList backupLogs={backupLogs} />
    </main>
  );
}
