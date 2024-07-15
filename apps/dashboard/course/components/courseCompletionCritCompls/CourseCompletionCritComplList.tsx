"use client";
import { CompleteCourseCompletionCritCompl } from "@soco/course-db/schema/courseCompletionCritCompls";
import { trpc } from "@/lib/trpc/client";
import CourseCompletionCritComplModal from "./CourseCompletionCritComplModal";


export default function CourseCompletionCritComplList({ courseCompletionCritCompls }: { courseCompletionCritCompls: CompleteCourseCompletionCritCompl[] }) {
  const { data: c } = trpc.courseCompletionCritCompls.getCourseCompletionCritCompls.useQuery(undefined, {
    initialData: { courseCompletionCritCompls },
    refetchOnMount: false,
  });

  if (c.courseCompletionCritCompls.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {c.courseCompletionCritCompls.map((courseCompletionCritCompl) => (
        <CourseCompletionCritCompl courseCompletionCritCompl={courseCompletionCritCompl} key={courseCompletionCritCompl.courseCompletionCritCompl.id} />
      ))}
    </ul>
  );
}

const CourseCompletionCritCompl = ({ courseCompletionCritCompl }: { courseCompletionCritCompl: CompleteCourseCompletionCritCompl }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{courseCompletionCritCompl.courseCompletionCritCompl.courseId}</div>
      </div>
      <CourseCompletionCritComplModal courseCompletionCritCompl={courseCompletionCritCompl.courseCompletionCritCompl} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No course completion crit compls
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new course completion crit compl.
      </p>
      <div className="mt-6">
        <CourseCompletionCritComplModal emptyState={true} />
      </div>
    </div>
  );
};

