import AnalyticsUsedAnalysableList from "@/components/analyticsUsedAnalysables/AnalyticsUsedAnalysableList";
import NewAnalyticsUsedAnalysableModal from "@/components/analyticsUsedAnalysables/AnalyticsUsedAnalysableModal";
import { api } from "@/lib/trpc/api";

export default async function AnalyticsUsedAnalysables() {
  const { analyticsUsedAnalysables } = await api.analyticsUsedAnalysables.getAnalyticsUsedAnalysables.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Analytics Used Analysables</h1>
        <NewAnalyticsUsedAnalysableModal />
      </div>
      <AnalyticsUsedAnalysableList analyticsUsedAnalysables={analyticsUsedAnalysables} />
    </main>
  );
}
