import AnalyticsPredictionList from "@/components/analyticsPredictions/AnalyticsPredictionList";
import NewAnalyticsPredictionModal from "@/components/analyticsPredictions/AnalyticsPredictionModal";
import { api } from "@/lib/trpc/api";

export default async function AnalyticsPredictions() {
  const { analyticsPredictions } = await api.analyticsPredictions.getAnalyticsPredictions.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Analytics Predictions</h1>
        <NewAnalyticsPredictionModal />
      </div>
      <AnalyticsPredictionList analyticsPredictions={analyticsPredictions} />
    </main>
  );
}
