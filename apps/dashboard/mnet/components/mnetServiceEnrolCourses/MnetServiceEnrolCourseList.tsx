"use client";
import { CompleteMnetServiceEnrolCourse } from "@soco/mnet-db/schema/mnetServiceEnrolCourses";
import { trpc } from "@/lib/trpc/client";
import MnetServiceEnrolCourseModal from "./MnetServiceEnrolCourseModal";


export default function MnetServiceEnrolCourseList({ mnetServiceEnrolCourses }: { mnetServiceEnrolCourses: CompleteMnetServiceEnrolCourse[] }) {
  const { data: m } = trpc.mnetServiceEnrolCourses.getMnetServiceEnrolCourses.useQuery(undefined, {
    initialData: { mnetServiceEnrolCourses },
    refetchOnMount: false,
  });

  if (m.mnetServiceEnrolCourses.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {m.mnetServiceEnrolCourses.map((mnetServiceEnrolCourse) => (
        <MnetServiceEnrolCourse mnetServiceEnrolCourse={mnetServiceEnrolCourse} key={mnetServiceEnrolCourse.mnetServiceEnrolCourse.id} />
      ))}
    </ul>
  );
}

const MnetServiceEnrolCourse = ({ mnetServiceEnrolCourse }: { mnetServiceEnrolCourse: CompleteMnetServiceEnrolCourse }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{mnetServiceEnrolCourse.mnetServiceEnrolCourse.categoryId}</div>
      </div>
      <MnetServiceEnrolCourseModal mnetServiceEnrolCourse={mnetServiceEnrolCourse.mnetServiceEnrolCourse} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No mnet service enrol courses
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new mnet service enrol course.
      </p>
      <div className="mt-6">
        <MnetServiceEnrolCourseModal emptyState={true} />
      </div>
    </div>
  );
};

