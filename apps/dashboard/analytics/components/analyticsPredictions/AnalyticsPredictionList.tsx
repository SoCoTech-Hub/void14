"use client";
import { CompleteAnalyticsPrediction } from "@/lib/db/schema/analyticsPredictions";
import { trpc } from "@/lib/trpc/client";
import AnalyticsPredictionModal from "./AnalyticsPredictionModal";


export default function AnalyticsPredictionList({ analyticsPredictions }: { analyticsPredictions: CompleteAnalyticsPrediction[] }) {
  const { data: a } = trpc.analyticsPredictions.getAnalyticsPredictions.useQuery(undefined, {
    initialData: { analyticsPredictions },
    refetchOnMount: false,
  });

  if (a.analyticsPredictions.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {a.analyticsPredictions.map((analyticsPrediction) => (
        <AnalyticsPrediction analyticsPrediction={analyticsPrediction} key={analyticsPrediction.id} />
      ))}
    </ul>
  );
}

const AnalyticsPrediction = ({ analyticsPrediction }: { analyticsPrediction: CompleteAnalyticsPrediction }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{analyticsPrediction.calculations}</div>
      </div>
      <AnalyticsPredictionModal analyticsPrediction={analyticsPrediction} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No analytics predictions
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new analytics prediction.
      </p>
      <div className="mt-6">
        <AnalyticsPredictionModal emptyState={true} />
      </div>
    </div>
  );
};

