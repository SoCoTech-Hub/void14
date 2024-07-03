import AnalyticsPredictSampleList from "@/components/analyticsPredictSamples/AnalyticsPredictSampleList";
import NewAnalyticsPredictSampleModal from "@/components/analyticsPredictSamples/AnalyticsPredictSampleModal";
import { api } from "@/lib/trpc/api";

export default async function AnalyticsPredictSamples() {
  const { analyticsPredictSamples } = await api.analyticsPredictSamples.getAnalyticsPredictSamples.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Analytics Predict Samples</h1>
        <NewAnalyticsPredictSampleModal />
      </div>
      <AnalyticsPredictSampleList analyticsPredictSamples={analyticsPredictSamples} />
    </main>
  );
}
