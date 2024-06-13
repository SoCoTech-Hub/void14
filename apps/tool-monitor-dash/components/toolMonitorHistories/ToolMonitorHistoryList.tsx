"use client";
import { CompleteToolMonitorHistory } from "@/lib/db/schema/toolMonitorHistories";
import { trpc } from "@/lib/trpc/client";
import ToolMonitorHistoryModal from "./ToolMonitorHistoryModal";


export default function ToolMonitorHistoryList({ toolMonitorHistories }: { toolMonitorHistories: CompleteToolMonitorHistory[] }) {
  const { data: t } = trpc.toolMonitorHistories.getToolMonitorHistories.useQuery(undefined, {
    initialData: { toolMonitorHistories },
    refetchOnMount: false,
  });

  if (t.toolMonitorHistories.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {t.toolMonitorHistories.map((toolMonitorHistory) => (
        <ToolMonitorHistory toolMonitorHistory={toolMonitorHistory} key={toolMonitorHistory.id} />
      ))}
    </ul>
  );
}

const ToolMonitorHistory = ({ toolMonitorHistory }: { toolMonitorHistory: CompleteToolMonitorHistory }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{toolMonitorHistory.sid}</div>
      </div>
      <ToolMonitorHistoryModal toolMonitorHistory={toolMonitorHistory} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No tool monitor histories
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new tool monitor history.
      </p>
      <div className="mt-6">
        <ToolMonitorHistoryModal emptyState={true} />
      </div>
    </div>
  );
};

