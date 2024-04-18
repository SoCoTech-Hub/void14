import AnalyticsModelsLogList from "@/components/analyticsModelsLogs/AnalyticsModelsLogList";
import NewAnalyticsModelsLogModal from "@/components/analyticsModelsLogs/AnalyticsModelsLogModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function AnalyticsModelsLogs() {
  await checkAuth();
  const { analyticsModelsLogs } = await api.analyticsModelsLogs.getAnalyticsModelsLogs.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Analytics Models Logs</h1>
        <NewAnalyticsModelsLogModal />
      </div>
      <AnalyticsModelsLogList analyticsModelsLogs={analyticsModelsLogs} />
    </main>
  );
}
