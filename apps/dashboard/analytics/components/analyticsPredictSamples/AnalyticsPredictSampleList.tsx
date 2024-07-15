"use client";
import { CompleteAnalyticsPredictSample } from "@soco/analytics-db/schema/analyticsPredictSamples";
import { trpc } from "@/lib/trpc/client";
import AnalyticsPredictSampleModal from "./AnalyticsPredictSampleModal";


export default function AnalyticsPredictSampleList({ analyticsPredictSamples }: { analyticsPredictSamples: CompleteAnalyticsPredictSample[] }) {
  const { data: a } = trpc.analyticsPredictSamples.getAnalyticsPredictSamples.useQuery(undefined, {
    initialData: { analyticsPredictSamples },
    refetchOnMount: false,
  });

  if (a.analyticsPredictSamples.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {a.analyticsPredictSamples.map((analyticsPredictSample) => (
        <AnalyticsPredictSample analyticsPredictSample={analyticsPredictSample} key={analyticsPredictSample.id} />
      ))}
    </ul>
  );
}

const AnalyticsPredictSample = ({ analyticsPredictSample }: { analyticsPredictSample: CompleteAnalyticsPredictSample }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{analyticsPredictSample.analysableId}</div>
      </div>
      <AnalyticsPredictSampleModal analyticsPredictSample={analyticsPredictSample} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No analytics predict samples
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new analytics predict sample.
      </p>
      <div className="mt-6">
        <AnalyticsPredictSampleModal emptyState={true} />
      </div>
    </div>
  );
};

