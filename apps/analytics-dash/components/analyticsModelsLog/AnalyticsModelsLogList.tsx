"use client";
import { CompleteAnalyticsModelsLog } from "@/lib/db/schema/analyticsModelsLog";
import { trpc } from "@/lib/trpc/client";
import AnalyticsModelsLogModal from "./AnalyticsModelsLogModal";


export default function AnalyticsModelsLogList({ analyticsModelsLog }: { analyticsModelsLog: CompleteAnalyticsModelsLog[] }) {
  const { data: a } = trpc.analyticsModelsLog.getAnalyticsModelsLog.useQuery(undefined, {
    initialData: { analyticsModelsLog },
    refetchOnMount: false,
  });

  if (a.analyticsModelsLog.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {a.analyticsModelsLog.map((analyticsModelsLog) => (
        <AnalyticsModelsLog analyticsModelsLog={analyticsModelsLog} key={analyticsModelsLog.id} />
      ))}
    </ul>
  );
}

const AnalyticsModelsLog = ({ analyticsModelsLog }: { analyticsModelsLog: CompleteAnalyticsModelsLog }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{analyticsModelsLog.dir}</div>
      </div>
      <AnalyticsModelsLogModal analyticsModelsLog={analyticsModelsLog} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No analytics models log
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new analytics models log.
      </p>
      <div className="mt-6">
        <AnalyticsModelsLogModal emptyState={true} />
      </div>
    </div>
  );
};

