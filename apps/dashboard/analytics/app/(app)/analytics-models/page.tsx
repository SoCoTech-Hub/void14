import AnalyticsModelList from "@/components/analyticsModels/AnalyticsModelList";
import NewAnalyticsModelModal from "@/components/analyticsModels/AnalyticsModelModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function AnalyticsModels() {
  await checkAuth();
  const { analyticsModels } = await api.analyticsModels.getAnalyticsModels.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Analytics Models</h1>
        <NewAnalyticsModelModal />
      </div>
      <AnalyticsModelList analyticsModels={analyticsModels} />
    </main>
  );
}
