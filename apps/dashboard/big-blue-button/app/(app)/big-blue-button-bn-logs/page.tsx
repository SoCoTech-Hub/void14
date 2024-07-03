import BigBlueButtonBnLogList from "@/components/bigBlueButtonBnLogs/BigBlueButtonBnLogList";
import NewBigBlueButtonBnLogModal from "@/components/bigBlueButtonBnLogs/BigBlueButtonBnLogModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function BigBlueButtonBnLogs() {
  await checkAuth();
  const { bigBlueButtonBnLogs } = await api.bigBlueButtonBnLogs.getBigBlueButtonBnLogs.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Big Blue Button Bn Logs</h1>
        <NewBigBlueButtonBnLogModal />
      </div>
      <BigBlueButtonBnLogList bigBlueButtonBnLogs={bigBlueButtonBnLogs} />
    </main>
  );
}
