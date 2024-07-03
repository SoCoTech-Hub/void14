import ToolMonitorHistoryList from "@/components/toolMonitorHistories/ToolMonitorHistoryList";
import NewToolMonitorHistoryModal from "@/components/toolMonitorHistories/ToolMonitorHistoryModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function ToolMonitorHistories() {
  await checkAuth();
  const { toolMonitorHistories } = await api.toolMonitorHistories.getToolMonitorHistories.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Tool Monitor Histories</h1>
        <NewToolMonitorHistoryModal />
      </div>
      <ToolMonitorHistoryList toolMonitorHistories={toolMonitorHistories} />
    </main>
  );
}
