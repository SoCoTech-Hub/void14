"use client";
import { CompleteCourseModulesCompletion } from "@soco/course-db/schema/courseModulesCompletions";
import { trpc } from "@/lib/trpc/client";
import CourseModulesCompletionModal from "./CourseModulesCompletionModal";


export default function CourseModulesCompletionList({ courseModulesCompletions }: { courseModulesCompletions: CompleteCourseModulesCompletion[] }) {
  const { data: c } = trpc.courseModulesCompletions.getCourseModulesCompletions.useQuery(undefined, {
    initialData: { courseModulesCompletions },
    refetchOnMount: false,
  });

  if (c.courseModulesCompletions.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {c.courseModulesCompletions.map((courseModulesCompletion) => (
        <CourseModulesCompletion courseModulesCompletion={courseModulesCompletion} key={courseModulesCompletion.id} />
      ))}
    </ul>
  );
}

const CourseModulesCompletion = ({ courseModulesCompletion }: { courseModulesCompletion: CompleteCourseModulesCompletion }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{courseModulesCompletion.courseModuleId}</div>
      </div>
      <CourseModulesCompletionModal courseModulesCompletion={courseModulesCompletion} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No course modules completions
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new course modules completion.
      </p>
      <div className="mt-6">
        <CourseModulesCompletionModal emptyState={true} />
      </div>
    </div>
  );
};

