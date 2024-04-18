import AnalyticsPredictionActionList from "@/components/analyticsPredictionActions/AnalyticsPredictionActionList";
import NewAnalyticsPredictionActionModal from "@/components/analyticsPredictionActions/AnalyticsPredictionActionModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function AnalyticsPredictionActions() {
  await checkAuth();
  const { analyticsPredictionActions } = await api.analyticsPredictionActions.getAnalyticsPredictionActions.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Analytics Prediction Actions</h1>
        <NewAnalyticsPredictionActionModal />
      </div>
      <AnalyticsPredictionActionList analyticsPredictionActions={analyticsPredictionActions} />
    </main>
  );
}
