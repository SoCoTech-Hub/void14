"use client";
import { CompleteGradeItem } from "@soco/grade-db/schema/gradeItems";
import { trpc } from "@/lib/trpc/client";
import GradeItemModal from "./GradeItemModal";


export default function GradeItemList({ gradeItems }: { gradeItems: CompleteGradeItem[] }) {
  const { data: g } = trpc.gradeItems.getGradeItems.useQuery(undefined, {
    initialData: { gradeItems },
    refetchOnMount: false,
  });

  if (g.gradeItems.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {g.gradeItems.map((gradeItem) => (
        <GradeItem gradeItem={gradeItem} key={gradeItem.id} />
      ))}
    </ul>
  );
}

const GradeItem = ({ gradeItem }: { gradeItem: CompleteGradeItem }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{gradeItem.aggregationCoef}</div>
      </div>
      <GradeItemModal gradeItem={gradeItem} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No grade items
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new grade item.
      </p>
      <div className="mt-6">
        <GradeItemModal emptyState={true} />
      </div>
    </div>
  );
};

