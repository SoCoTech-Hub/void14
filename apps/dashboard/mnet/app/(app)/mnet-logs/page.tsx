import MnetLogList from "@/components/mnetLogs/MnetLogList";
import NewMnetLogModal from "@/components/mnetLogs/MnetLogModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function MnetLogs() {
  await checkAuth();
  const { mnetLogs } = await api.mnetLogs.getMnetLogs.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Mnet Logs</h1>
        <NewMnetLogModal />
      </div>
      <MnetLogList mnetLogs={mnetLogs} />
    </main>
  );
}
