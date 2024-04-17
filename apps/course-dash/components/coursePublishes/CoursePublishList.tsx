"use client";
import { CompleteCoursePublish } from "@/lib/db/schema/coursePublishes";
import { trpc } from "@/lib/trpc/client";
import CoursePublishModal from "./CoursePublishModal";


export default function CoursePublishList({ coursePublishes }: { coursePublishes: CompleteCoursePublish[] }) {
  const { data: c } = trpc.coursePublishes.getCoursePublishes.useQuery(undefined, {
    initialData: { coursePublishes },
    refetchOnMount: false,
  });

  if (c.coursePublishes.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {c.coursePublishes.map((coursePublish) => (
        <CoursePublish coursePublish={coursePublish} key={coursePublish.coursePublish.id} />
      ))}
    </ul>
  );
}

const CoursePublish = ({ coursePublish }: { coursePublish: CompleteCoursePublish }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{coursePublish.coursePublish.courseId}</div>
      </div>
      <CoursePublishModal coursePublish={coursePublish.coursePublish} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No course publishes
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new course publish.
      </p>
      <div className="mt-6">
        <CoursePublishModal emptyState={true} />
      </div>
    </div>
  );
};

