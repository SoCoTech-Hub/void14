"use client";
import { CompleteCourseCompletionCriteria } from "@/lib/db/schema/courseCompletionCriterias";
import { trpc } from "@/lib/trpc/client";
import CourseCompletionCriteriaModal from "./CourseCompletionCriteriaModal";


export default function CourseCompletionCriteriaList({ courseCompletionCriterias }: { courseCompletionCriterias: CompleteCourseCompletionCriteria[] }) {
  const { data: c } = trpc.courseCompletionCriterias.getCourseCompletionCriterias.useQuery(undefined, {
    initialData: { courseCompletionCriterias },
    refetchOnMount: false,
  });

  if (c.courseCompletionCriterias.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {c.courseCompletionCriterias.map((courseCompletionCriteria) => (
        <CourseCompletionCriteria courseCompletionCriteria={courseCompletionCriteria} key={courseCompletionCriteria.courseCompletionCriteria.id} />
      ))}
    </ul>
  );
}

const CourseCompletionCriteria = ({ courseCompletionCriteria }: { courseCompletionCriteria: CompleteCourseCompletionCriteria }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{courseCompletionCriteria.courseCompletionCriteria.courseId}</div>
      </div>
      <CourseCompletionCriteriaModal courseCompletionCriteria={courseCompletionCriteria.courseCompletionCriteria} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No course completion criterias
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new course completion criteria.
      </p>
      <div className="mt-6">
        <CourseCompletionCriteriaModal emptyState={true} />
      </div>
    </div>
  );
};

