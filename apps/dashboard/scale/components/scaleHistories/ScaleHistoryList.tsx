"use client";
import { CompleteScaleHistory } from "@soco/scale-db/schema/scaleHistories";
import { trpc } from "@/lib/trpc/client";
import ScaleHistoryModal from "./ScaleHistoryModal";


export default function ScaleHistoryList({ scaleHistories }: { scaleHistories: CompleteScaleHistory[] }) {
  const { data: s } = trpc.scaleHistories.getScaleHistories.useQuery(undefined, {
    initialData: { scaleHistories },
    refetchOnMount: false,
  });

  if (s.scaleHistories.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {s.scaleHistories.map((scaleHistory) => (
        <ScaleHistory scaleHistory={scaleHistory} key={scaleHistory.id} />
      ))}
    </ul>
  );
}

const ScaleHistory = ({ scaleHistory }: { scaleHistory: CompleteScaleHistory }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{scaleHistory.action}</div>
      </div>
      <ScaleHistoryModal scaleHistory={scaleHistory} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No scale histories
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new scale history.
      </p>
      <div className="mt-6">
        <ScaleHistoryModal emptyState={true} />
      </div>
    </div>
  );
};

