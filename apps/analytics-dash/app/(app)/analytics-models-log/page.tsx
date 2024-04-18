import AnalyticsModelsLogList from "@/components/analyticsModelsLog/AnalyticsModelsLogList";
import NewAnalyticsModelsLogModal from "@/components/analyticsModelsLog/AnalyticsModelsLogModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function AnalyticsModelsLog() {
  await checkAuth();
  const { analyticsModelsLog } = await api.analyticsModelsLog.getAnalyticsModelsLog.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Analytics Models Log</h1>
        <NewAnalyticsModelsLogModal />
      </div>
      <AnalyticsModelsLogList analyticsModelsLog={analyticsModelsLog} />
    </main>
  );
}
