"use client";
import { CompleteCourseCompletion } from "@soco/course-db/schema/courseCompletions";
import { trpc } from "@/lib/trpc/client";
import CourseCompletionModal from "./CourseCompletionModal";


export default function CourseCompletionList({ courseCompletions }: { courseCompletions: CompleteCourseCompletion[] }) {
  const { data: c } = trpc.courseCompletions.getCourseCompletions.useQuery(undefined, {
    initialData: { courseCompletions },
    refetchOnMount: false,
  });

  if (c.courseCompletions.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {c.courseCompletions.map((courseCompletion) => (
        <CourseCompletion courseCompletion={courseCompletion} key={courseCompletion.courseCompletion.id} />
      ))}
    </ul>
  );
}

const CourseCompletion = ({ courseCompletion }: { courseCompletion: CompleteCourseCompletion }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{courseCompletion.courseCompletion.courseId}</div>
      </div>
      <CourseCompletionModal courseCompletion={courseCompletion.courseCompletion} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No course completions
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new course completion.
      </p>
      <div className="mt-6">
        <CourseCompletionModal emptyState={true} />
      </div>
    </div>
  );
};

