"use client";
import { CompleteCourseCompletionDefault } from "@/lib/db/schema/courseCompletionDefaults";
import { trpc } from "@/lib/trpc/client";
import CourseCompletionDefaultModal from "./CourseCompletionDefaultModal";


export default function CourseCompletionDefaultList({ courseCompletionDefaults }: { courseCompletionDefaults: CompleteCourseCompletionDefault[] }) {
  const { data: c } = trpc.courseCompletionDefaults.getCourseCompletionDefaults.useQuery(undefined, {
    initialData: { courseCompletionDefaults },
    refetchOnMount: false,
  });

  if (c.courseCompletionDefaults.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {c.courseCompletionDefaults.map((courseCompletionDefault) => (
        <CourseCompletionDefault courseCompletionDefault={courseCompletionDefault} key={courseCompletionDefault.courseCompletionDefault.id} />
      ))}
    </ul>
  );
}

const CourseCompletionDefault = ({ courseCompletionDefault }: { courseCompletionDefault: CompleteCourseCompletionDefault }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{courseCompletionDefault.courseCompletionDefault.completionExpectedDate.toString()}</div>
      </div>
      <CourseCompletionDefaultModal courseCompletionDefault={courseCompletionDefault.courseCompletionDefault} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No course completion defaults
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new course completion default.
      </p>
      <div className="mt-6">
        <CourseCompletionDefaultModal emptyState={true} />
      </div>
    </div>
  );
};

