"use client";
import { CompleteAnalyticsUsedAnalysable } from "@soco/analytics-db/schema/analyticsUsedAnalysables";
import { trpc } from "@/lib/trpc/client";
import AnalyticsUsedAnalysableModal from "./AnalyticsUsedAnalysableModal";


export default function AnalyticsUsedAnalysableList({ analyticsUsedAnalysables }: { analyticsUsedAnalysables: CompleteAnalyticsUsedAnalysable[] }) {
  const { data: a } = trpc.analyticsUsedAnalysables.getAnalyticsUsedAnalysables.useQuery(undefined, {
    initialData: { analyticsUsedAnalysables },
    refetchOnMount: false,
  });

  if (a.analyticsUsedAnalysables.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {a.analyticsUsedAnalysables.map((analyticsUsedAnalysable) => (
        <AnalyticsUsedAnalysable analyticsUsedAnalysable={analyticsUsedAnalysable} key={analyticsUsedAnalysable.id} />
      ))}
    </ul>
  );
}

const AnalyticsUsedAnalysable = ({ analyticsUsedAnalysable }: { analyticsUsedAnalysable: CompleteAnalyticsUsedAnalysable }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{analyticsUsedAnalysable.action}</div>
      </div>
      <AnalyticsUsedAnalysableModal analyticsUsedAnalysable={analyticsUsedAnalysable} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No analytics used analysables
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new analytics used analysable.
      </p>
      <div className="mt-6">
        <AnalyticsUsedAnalysableModal emptyState={true} />
      </div>
    </div>
  );
};

