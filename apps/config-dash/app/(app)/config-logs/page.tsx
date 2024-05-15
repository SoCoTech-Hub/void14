import ConfigLogList from "@/components/configLogs/ConfigLogList";
import NewConfigLogModal from "@/components/configLogs/ConfigLogModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function ConfigLogs() {
  await checkAuth();
  const { configLogs } = await api.configLogs.getConfigLogs.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Config Logs</h1>
        <NewConfigLogModal />
      </div>
      <ConfigLogList configLogs={configLogs} />
    </main>
  );
}
