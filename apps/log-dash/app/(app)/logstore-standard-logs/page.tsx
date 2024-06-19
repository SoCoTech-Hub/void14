import LogstoreStandardLogList from "@/components/logstoreStandardLogs/LogstoreStandardLogList";
import NewLogstoreStandardLogModal from "@/components/logstoreStandardLogs/LogstoreStandardLogModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function LogstoreStandardLogs() {
  await checkAuth();
  const { logstoreStandardLogs } = await api.logstoreStandardLogs.getLogstoreStandardLogs.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Logstore Standard Logs</h1>
        <NewLogstoreStandardLogModal />
      </div>
      <LogstoreStandardLogList logstoreStandardLogs={logstoreStandardLogs} />
    </main>
  );
}
