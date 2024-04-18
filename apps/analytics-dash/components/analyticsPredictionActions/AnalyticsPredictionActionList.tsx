"use client";
import { CompleteAnalyticsPredictionAction } from "@/lib/db/schema/analyticsPredictionActions";
import { trpc } from "@/lib/trpc/client";
import AnalyticsPredictionActionModal from "./AnalyticsPredictionActionModal";


export default function AnalyticsPredictionActionList({ analyticsPredictionActions }: { analyticsPredictionActions: CompleteAnalyticsPredictionAction[] }) {
  const { data: a } = trpc.analyticsPredictionActions.getAnalyticsPredictionActions.useQuery(undefined, {
    initialData: { analyticsPredictionActions },
    refetchOnMount: false,
  });

  if (a.analyticsPredictionActions.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {a.analyticsPredictionActions.map((analyticsPredictionAction) => (
        <AnalyticsPredictionAction analyticsPredictionAction={analyticsPredictionAction} key={analyticsPredictionAction.id} />
      ))}
    </ul>
  );
}

const AnalyticsPredictionAction = ({ analyticsPredictionAction }: { analyticsPredictionAction: CompleteAnalyticsPredictionAction }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{analyticsPredictionAction.actionName}</div>
      </div>
      <AnalyticsPredictionActionModal analyticsPredictionAction={analyticsPredictionAction} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No analytics prediction actions
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new analytics prediction action.
      </p>
      <div className="mt-6">
        <AnalyticsPredictionActionModal emptyState={true} />
      </div>
    </div>
  );
};

