"use client";
import { CompleteCourseRequest } from "@/lib/db/schema/courseRequests";
import { trpc } from "@/lib/trpc/client";
import CourseRequestModal from "./CourseRequestModal";


export default function CourseRequestList({ courseRequests }: { courseRequests: CompleteCourseRequest[] }) {
  const { data: c } = trpc.courseRequests.getCourseRequests.useQuery(undefined, {
    initialData: { courseRequests },
    refetchOnMount: false,
  });

  if (c.courseRequests.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {c.courseRequests.map((courseRequest) => (
        <CourseRequest courseRequest={courseRequest} key={courseRequest.id} />
      ))}
    </ul>
  );
}

const CourseRequest = ({ courseRequest }: { courseRequest: CompleteCourseRequest }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{courseRequest.categoryId}</div>
      </div>
      <CourseRequestModal courseRequest={courseRequest} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No course requests
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new course request.
      </p>
      <div className="mt-6">
        <CourseRequestModal emptyState={true} />
      </div>
    </div>
  );
};

