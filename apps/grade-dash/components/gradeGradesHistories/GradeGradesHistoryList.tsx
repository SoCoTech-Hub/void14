"use client";
import { CompleteGradeGradesHistory } from "@/lib/db/schema/gradeGradesHistories";
import { trpc } from "@/lib/trpc/client";
import GradeGradesHistoryModal from "./GradeGradesHistoryModal";


export default function GradeGradesHistoryList({ gradeGradesHistories }: { gradeGradesHistories: CompleteGradeGradesHistory[] }) {
  const { data: g } = trpc.gradeGradesHistories.getGradeGradesHistories.useQuery(undefined, {
    initialData: { gradeGradesHistories },
    refetchOnMount: false,
  });

  if (g.gradeGradesHistories.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {g.gradeGradesHistories.map((gradeGradesHistory) => (
        <GradeGradesHistory gradeGradesHistory={gradeGradesHistory} key={gradeGradesHistory.id} />
      ))}
    </ul>
  );
}

const GradeGradesHistory = ({ gradeGradesHistory }: { gradeGradesHistory: CompleteGradeGradesHistory }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{gradeGradesHistory.action}</div>
      </div>
      <GradeGradesHistoryModal gradeGradesHistory={gradeGradesHistory} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No grade grades histories
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new grade grades history.
      </p>
      <div className="mt-6">
        <GradeGradesHistoryModal emptyState={true} />
      </div>
    </div>
  );
};

