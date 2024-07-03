"use client";
import { CompleteGradeItemsHistory } from "@/lib/db/schema/gradeItemsHistories";
import { trpc } from "@/lib/trpc/client";
import GradeItemsHistoryModal from "./GradeItemsHistoryModal";


export default function GradeItemsHistoryList({ gradeItemsHistories }: { gradeItemsHistories: CompleteGradeItemsHistory[] }) {
  const { data: g } = trpc.gradeItemsHistories.getGradeItemsHistories.useQuery(undefined, {
    initialData: { gradeItemsHistories },
    refetchOnMount: false,
  });

  if (g.gradeItemsHistories.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {g.gradeItemsHistories.map((gradeItemsHistory) => (
        <GradeItemsHistory gradeItemsHistory={gradeItemsHistory} key={gradeItemsHistory.id} />
      ))}
    </ul>
  );
}

const GradeItemsHistory = ({ gradeItemsHistory }: { gradeItemsHistory: CompleteGradeItemsHistory }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{gradeItemsHistory.action}</div>
      </div>
      <GradeItemsHistoryModal gradeItemsHistory={gradeItemsHistory} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No grade items histories
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new grade items history.
      </p>
      <div className="mt-6">
        <GradeItemsHistoryModal emptyState={true} />
      </div>
    </div>
  );
};

