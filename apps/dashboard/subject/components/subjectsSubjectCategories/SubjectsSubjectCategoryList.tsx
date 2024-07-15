"use client";
import { CompleteSubjectsSubjectCategory } from "@soco/subject-db/schema/subjectsSubjectCategories";
import { trpc } from "@/lib/trpc/client";
import SubjectsSubjectCategoryModal from "./SubjectsSubjectCategoryModal";


export default function SubjectsSubjectCategoryList({ subjectsSubjectCategories }: { subjectsSubjectCategories: CompleteSubjectsSubjectCategory[] }) {
  const { data: s } = trpc.subjectsSubjectCategories.getSubjectsSubjectCategories.useQuery(undefined, {
    initialData: { subjectsSubjectCategories },
    refetchOnMount: false,
  });

  if (s.subjectsSubjectCategories.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {s.subjectsSubjectCategories.map((subjectsSubjectCategory) => (
        <SubjectsSubjectCategory subjectsSubjectCategory={subjectsSubjectCategory} key={subjectsSubjectCategory.subjectsSubjectCategory.id} />
      ))}
    </ul>
  );
}

const SubjectsSubjectCategory = ({ subjectsSubjectCategory }: { subjectsSubjectCategory: CompleteSubjectsSubjectCategory }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{subjectsSubjectCategory.subjectsSubjectCategory.subjectCategoryId}</div>
      </div>
      <SubjectsSubjectCategoryModal subjectsSubjectCategory={subjectsSubjectCategory.subjectsSubjectCategory} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No subjects subject categories
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new subjects subject category.
      </p>
      <div className="mt-6">
        <SubjectsSubjectCategoryModal emptyState={true} />
      </div>
    </div>
  );
};

