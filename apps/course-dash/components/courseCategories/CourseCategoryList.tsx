"use client";
import { CompleteCourseCategory } from "@/lib/db/schema/courseCategories";
import { trpc } from "@/lib/trpc/client";
import CourseCategoryModal from "./CourseCategoryModal";


export default function CourseCategoryList({ courseCategories }: { courseCategories: CompleteCourseCategory[] }) {
  const { data: c } = trpc.courseCategories.getCourseCategories.useQuery(undefined, {
    initialData: { courseCategories },
    refetchOnMount: false,
  });

  if (c.courseCategories.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {c.courseCategories.map((courseCategory) => (
        <CourseCategory courseCategory={courseCategory} key={courseCategory.id} />
      ))}
    </ul>
  );
}

const CourseCategory = ({ courseCategory }: { courseCategory: CompleteCourseCategory }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{courseCategory.courseCount}</div>
      </div>
      <CourseCategoryModal courseCategory={courseCategory} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No course categories
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new course category.
      </p>
      <div className="mt-6">
        <CourseCategoryModal emptyState={true} />
      </div>
    </div>
  );
};

