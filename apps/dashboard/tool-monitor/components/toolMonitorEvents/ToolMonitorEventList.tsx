"use client";
import { CompleteToolMonitorEvent } from "@soco/tool-monitor-db/schema/toolMonitorEvents";
import { trpc } from "@/lib/trpc/client";
import ToolMonitorEventModal from "./ToolMonitorEventModal";


export default function ToolMonitorEventList({ toolMonitorEvents }: { toolMonitorEvents: CompleteToolMonitorEvent[] }) {
  const { data: t } = trpc.toolMonitorEvents.getToolMonitorEvents.useQuery(undefined, {
    initialData: { toolMonitorEvents },
    refetchOnMount: false,
  });

  if (t.toolMonitorEvents.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {t.toolMonitorEvents.map((toolMonitorEvent) => (
        <ToolMonitorEvent toolMonitorEvent={toolMonitorEvent} key={toolMonitorEvent.id} />
      ))}
    </ul>
  );
}

const ToolMonitorEvent = ({ toolMonitorEvent }: { toolMonitorEvent: CompleteToolMonitorEvent }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{toolMonitorEvent.contextId}</div>
      </div>
      <ToolMonitorEventModal toolMonitorEvent={toolMonitorEvent} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No tool monitor events
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new tool monitor event.
      </p>
      <div className="mt-6">
        <ToolMonitorEventModal emptyState={true} />
      </div>
    </div>
  );
};

