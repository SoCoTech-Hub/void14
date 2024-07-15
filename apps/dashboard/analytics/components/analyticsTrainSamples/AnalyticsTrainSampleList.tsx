"use client";
import { CompleteAnalyticsTrainSample } from "@soco/analytics-db/schema/analyticsTrainSamples";
import { trpc } from "@/lib/trpc/client";
import AnalyticsTrainSampleModal from "./AnalyticsTrainSampleModal";


export default function AnalyticsTrainSampleList({ analyticsTrainSamples }: { analyticsTrainSamples: CompleteAnalyticsTrainSample[] }) {
  const { data: a } = trpc.analyticsTrainSamples.getAnalyticsTrainSamples.useQuery(undefined, {
    initialData: { analyticsTrainSamples },
    refetchOnMount: false,
  });

  if (a.analyticsTrainSamples.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {a.analyticsTrainSamples.map((analyticsTrainSample) => (
        <AnalyticsTrainSample analyticsTrainSample={analyticsTrainSample} key={analyticsTrainSample.id} />
      ))}
    </ul>
  );
}

const AnalyticsTrainSample = ({ analyticsTrainSample }: { analyticsTrainSample: CompleteAnalyticsTrainSample }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{analyticsTrainSample.analysableId}</div>
      </div>
      <AnalyticsTrainSampleModal analyticsTrainSample={analyticsTrainSample} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No analytics train samples
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new analytics train sample.
      </p>
      <div className="mt-6">
        <AnalyticsTrainSampleModal emptyState={true} />
      </div>
    </div>
  );
};

