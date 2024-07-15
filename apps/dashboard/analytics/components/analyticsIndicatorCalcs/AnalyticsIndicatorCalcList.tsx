"use client";
import { CompleteAnalyticsIndicatorCalc } from "@soco/analytics-db/schema/analyticsIndicatorCalcs";
import { trpc } from "@/lib/trpc/client";
import AnalyticsIndicatorCalcModal from "./AnalyticsIndicatorCalcModal";


export default function AnalyticsIndicatorCalcList({ analyticsIndicatorCalcs }: { analyticsIndicatorCalcs: CompleteAnalyticsIndicatorCalc[] }) {
  const { data: a } = trpc.analyticsIndicatorCalcs.getAnalyticsIndicatorCalcs.useQuery(undefined, {
    initialData: { analyticsIndicatorCalcs },
    refetchOnMount: false,
  });

  if (a.analyticsIndicatorCalcs.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {a.analyticsIndicatorCalcs.map((analyticsIndicatorCalc) => (
        <AnalyticsIndicatorCalc analyticsIndicatorCalc={analyticsIndicatorCalc} key={analyticsIndicatorCalc.id} />
      ))}
    </ul>
  );
}

const AnalyticsIndicatorCalc = ({ analyticsIndicatorCalc }: { analyticsIndicatorCalc: CompleteAnalyticsIndicatorCalc }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{analyticsIndicatorCalc.contextId}</div>
      </div>
      <AnalyticsIndicatorCalcModal analyticsIndicatorCalc={analyticsIndicatorCalc} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No analytics indicator calcs
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new analytics indicator calc.
      </p>
      <div className="mt-6">
        <AnalyticsIndicatorCalcModal emptyState={true} />
      </div>
    </div>
  );
};

