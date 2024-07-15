"use client";
import { CompleteSubjectCategory } from "@soco/subject-db/schema/subjectCategories";
import { trpc } from "@/lib/trpc/client";
import SubjectCategoryModal from "./SubjectCategoryModal";


export default function SubjectCategoryList({ subjectCategories }: { subjectCategories: CompleteSubjectCategory[] }) {
  const { data: s } = trpc.subjectCategories.getSubjectCategories.useQuery(undefined, {
    initialData: { subjectCategories },
    refetchOnMount: false,
  });

  if (s.subjectCategories.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {s.subjectCategories.map((subjectCategory) => (
        <SubjectCategory subjectCategory={subjectCategory} key={subjectCategory.id} />
      ))}
    </ul>
  );
}

const SubjectCategory = ({ subjectCategory }: { subjectCategory: CompleteSubjectCategory }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{subjectCategory.name}</div>
      </div>
      <SubjectCategoryModal subjectCategory={subjectCategory} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No subject categories
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new subject category.
      </p>
      <div className="mt-6">
        <SubjectCategoryModal emptyState={true} />
      </div>
    </div>
  );
};

