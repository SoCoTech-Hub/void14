"use client";
import { CompleteCourseCompletionAggrMethd } from "@soco/course-db/schema/courseCompletionAggrMethds";
import { trpc } from "@/lib/trpc/client";
import CourseCompletionAggrMethdModal from "./CourseCompletionAggrMethdModal";


export default function CourseCompletionAggrMethdList({ courseCompletionAggrMethds }: { courseCompletionAggrMethds: CompleteCourseCompletionAggrMethd[] }) {
  const { data: c } = trpc.courseCompletionAggrMethds.getCourseCompletionAggrMethds.useQuery(undefined, {
    initialData: { courseCompletionAggrMethds },
    refetchOnMount: false,
  });

  if (c.courseCompletionAggrMethds.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {c.courseCompletionAggrMethds.map((courseCompletionAggrMethd) => (
        <CourseCompletionAggrMethd courseCompletionAggrMethd={courseCompletionAggrMethd} key={courseCompletionAggrMethd.courseCompletionAggrMethd.id} />
      ))}
    </ul>
  );
}

const CourseCompletionAggrMethd = ({ courseCompletionAggrMethd }: { courseCompletionAggrMethd: CompleteCourseCompletionAggrMethd }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{courseCompletionAggrMethd.courseCompletionAggrMethd.courseId}</div>
      </div>
      <CourseCompletionAggrMethdModal courseCompletionAggrMethd={courseCompletionAggrMethd.courseCompletionAggrMethd} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No course completion aggr methds
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new course completion aggr methd.
      </p>
      <div className="mt-6">
        <CourseCompletionAggrMethdModal emptyState={true} />
      </div>
    </div>
  );
};

