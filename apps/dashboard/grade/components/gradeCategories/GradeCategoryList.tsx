"use client";
import { CompleteGradeCategory } from "@/lib/db/schema/gradeCategories";
import { trpc } from "@/lib/trpc/client";
import GradeCategoryModal from "./GradeCategoryModal";


export default function GradeCategoryList({ gradeCategories }: { gradeCategories: CompleteGradeCategory[] }) {
  const { data: g } = trpc.gradeCategories.getGradeCategories.useQuery(undefined, {
    initialData: { gradeCategories },
    refetchOnMount: false,
  });

  if (g.gradeCategories.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {g.gradeCategories.map((gradeCategory) => (
        <GradeCategory gradeCategory={gradeCategory} key={gradeCategory.id} />
      ))}
    </ul>
  );
}

const GradeCategory = ({ gradeCategory }: { gradeCategory: CompleteGradeCategory }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{gradeCategory.aggregateOnlyGraded}</div>
      </div>
      <GradeCategoryModal gradeCategory={gradeCategory} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No grade categories
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new grade category.
      </p>
      <div className="mt-6">
        <GradeCategoryModal emptyState={true} />
      </div>
    </div>
  );
};

