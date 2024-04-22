import BackupControllerList from "@/components/backupControllers/BackupControllerList";
import NewBackupControllerModal from "@/components/backupControllers/BackupControllerModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function BackupControllers() {
  await checkAuth();
  const { backupControllers } = await api.backupControllers.getBackupControllers.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Backup Controllers</h1>
        <NewBackupControllerModal />
      </div>
      <BackupControllerList backupControllers={backupControllers} />
    </main>
  );
}
