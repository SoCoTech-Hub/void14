import AnalyticsTrainSampleList from "@/components/analyticsTrainSamples/AnalyticsTrainSampleList";
import NewAnalyticsTrainSampleModal from "@/components/analyticsTrainSamples/AnalyticsTrainSampleModal";
import { api } from "@/lib/trpc/api";

export default async function AnalyticsTrainSamples() {
  const { analyticsTrainSamples } = await api.analyticsTrainSamples.getAnalyticsTrainSamples.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Analytics Train Samples</h1>
        <NewAnalyticsTrainSampleModal />
      </div>
      <AnalyticsTrainSampleList analyticsTrainSamples={analyticsTrainSamples} />
    </main>
  );
}
