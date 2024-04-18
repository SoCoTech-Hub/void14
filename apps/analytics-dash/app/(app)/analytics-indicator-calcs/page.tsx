import AnalyticsIndicatorCalcList from "@/components/analyticsIndicatorCalcs/AnalyticsIndicatorCalcList";
import NewAnalyticsIndicatorCalcModal from "@/components/analyticsIndicatorCalcs/AnalyticsIndicatorCalcModal";
import { api } from "@/lib/trpc/api";

export default async function AnalyticsIndicatorCalcs() {
  const { analyticsIndicatorCalcs } = await api.analyticsIndicatorCalcs.getAnalyticsIndicatorCalcs.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Analytics Indicator Calcs</h1>
        <NewAnalyticsIndicatorCalcModal />
      </div>
      <AnalyticsIndicatorCalcList analyticsIndicatorCalcs={analyticsIndicatorCalcs} />
    </main>
  );
}
