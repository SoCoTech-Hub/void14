"use client";
import { CompleteToolMonitorSubscription } from "@soco/tool-monitor-db/schema/toolMonitorSubscriptions";
import { trpc } from "@/lib/trpc/client";
import ToolMonitorSubscriptionModal from "./ToolMonitorSubscriptionModal";


export default function ToolMonitorSubscriptionList({ toolMonitorSubscriptions }: { toolMonitorSubscriptions: CompleteToolMonitorSubscription[] }) {
  const { data: t } = trpc.toolMonitorSubscriptions.getToolMonitorSubscriptions.useQuery(undefined, {
    initialData: { toolMonitorSubscriptions },
    refetchOnMount: false,
  });

  if (t.toolMonitorSubscriptions.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {t.toolMonitorSubscriptions.map((toolMonitorSubscription) => (
        <ToolMonitorSubscription toolMonitorSubscription={toolMonitorSubscription} key={toolMonitorSubscription.toolMonitorSubscription.id} />
      ))}
    </ul>
  );
}

const ToolMonitorSubscription = ({ toolMonitorSubscription }: { toolMonitorSubscription: CompleteToolMonitorSubscription }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{toolMonitorSubscription.toolMonitorSubscription.cmId}</div>
      </div>
      <ToolMonitorSubscriptionModal toolMonitorSubscription={toolMonitorSubscription.toolMonitorSubscription} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No tool monitor subscriptions
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new tool monitor subscription.
      </p>
      <div className="mt-6">
        <ToolMonitorSubscriptionModal emptyState={true} />
      </div>
    </div>
  );
};

