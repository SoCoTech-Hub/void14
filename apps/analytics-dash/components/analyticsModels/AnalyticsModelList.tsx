"use client";
import { CompleteAnalyticsModel } from "@/lib/db/schema/analyticsModels";
import { trpc } from "@/lib/trpc/client";
import AnalyticsModelModal from "./AnalyticsModelModal";


export default function AnalyticsModelList({ analyticsModels }: { analyticsModels: CompleteAnalyticsModel[] }) {
  const { data: a } = trpc.analyticsModels.getAnalyticsModels.useQuery(undefined, {
    initialData: { analyticsModels },
    refetchOnMount: false,
  });

  if (a.analyticsModels.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {a.analyticsModels.map((analyticsModel) => (
        <AnalyticsModel analyticsModel={analyticsModel} key={analyticsModel.id} />
      ))}
    </ul>
  );
}

const AnalyticsModel = ({ analyticsModel }: { analyticsModel: CompleteAnalyticsModel }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{analyticsModel.contextIds}</div>
      </div>
      <AnalyticsModelModal analyticsModel={analyticsModel} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No analytics models
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new analytics model.
      </p>
      <div className="mt-6">
        <AnalyticsModelModal emptyState={true} />
      </div>
    </div>
  );
};

