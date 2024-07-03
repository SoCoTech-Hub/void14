"use client";
import { CompleteGradeOutcomesHistory } from "@/lib/db/schema/gradeOutcomesHistories";
import { trpc } from "@/lib/trpc/client";
import GradeOutcomesHistoryModal from "./GradeOutcomesHistoryModal";


export default function GradeOutcomesHistoryList({ gradeOutcomesHistories }: { gradeOutcomesHistories: CompleteGradeOutcomesHistory[] }) {
  const { data: g } = trpc.gradeOutcomesHistories.getGradeOutcomesHistories.useQuery(undefined, {
    initialData: { gradeOutcomesHistories },
    refetchOnMount: false,
  });

  if (g.gradeOutcomesHistories.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {g.gradeOutcomesHistories.map((gradeOutcomesHistory) => (
        <GradeOutcomesHistory gradeOutcomesHistory={gradeOutcomesHistory} key={gradeOutcomesHistory.id} />
      ))}
    </ul>
  );
}

const GradeOutcomesHistory = ({ gradeOutcomesHistory }: { gradeOutcomesHistory: CompleteGradeOutcomesHistory }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{gradeOutcomesHistory.action}</div>
      </div>
      <GradeOutcomesHistoryModal gradeOutcomesHistory={gradeOutcomesHistory} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No grade outcomes histories
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new grade outcomes history.
      </p>
      <div className="mt-6">
        <GradeOutcomesHistoryModal emptyState={true} />
      </div>
    </div>
  );
};

