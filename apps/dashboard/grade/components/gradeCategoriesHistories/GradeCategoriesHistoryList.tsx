"use client";
import { CompleteGradeCategoriesHistory } from "@soco/grade-db/schema/gradeCategoriesHistories";
import { trpc } from "@/lib/trpc/client";
import GradeCategoriesHistoryModal from "./GradeCategoriesHistoryModal";


export default function GradeCategoriesHistoryList({ gradeCategoriesHistories }: { gradeCategoriesHistories: CompleteGradeCategoriesHistory[] }) {
  const { data: g } = trpc.gradeCategoriesHistories.getGradeCategoriesHistories.useQuery(undefined, {
    initialData: { gradeCategoriesHistories },
    refetchOnMount: false,
  });

  if (g.gradeCategoriesHistories.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {g.gradeCategoriesHistories.map((gradeCategoriesHistory) => (
        <GradeCategoriesHistory gradeCategoriesHistory={gradeCategoriesHistory} key={gradeCategoriesHistory.id} />
      ))}
    </ul>
  );
}

const GradeCategoriesHistory = ({ gradeCategoriesHistory }: { gradeCategoriesHistory: CompleteGradeCategoriesHistory }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{gradeCategoriesHistory.action}</div>
      </div>
      <GradeCategoriesHistoryModal gradeCategoriesHistory={gradeCategoriesHistory} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No grade categories histories
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new grade categories history.
      </p>
      <div className="mt-6">
        <GradeCategoriesHistoryModal emptyState={true} />
      </div>
    </div>
  );
};

