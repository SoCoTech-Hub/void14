"use client";
import { CompleteToolRecyclebinCourse } from "@/lib/db/schema/toolRecyclebinCourses";
import { trpc } from "@/lib/trpc/client";
import ToolRecyclebinCourseModal from "./ToolRecyclebinCourseModal";


export default function ToolRecyclebinCourseList({ toolRecyclebinCourses }: { toolRecyclebinCourses: CompleteToolRecyclebinCourse[] }) {
  const { data: t } = trpc.toolRecyclebinCourses.getToolRecyclebinCourses.useQuery(undefined, {
    initialData: { toolRecyclebinCourses },
    refetchOnMount: false,
  });

  if (t.toolRecyclebinCourses.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {t.toolRecyclebinCourses.map((toolRecyclebinCourse) => (
        <ToolRecyclebinCourse toolRecyclebinCourse={toolRecyclebinCourse} key={toolRecyclebinCourse.id} />
      ))}
    </ul>
  );
}

const ToolRecyclebinCourse = ({ toolRecyclebinCourse }: { toolRecyclebinCourse: CompleteToolRecyclebinCourse }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{toolRecyclebinCourse.courseId}</div>
      </div>
      <ToolRecyclebinCourseModal toolRecyclebinCourse={toolRecyclebinCourse} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No tool recyclebin courses
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new tool recyclebin course.
      </p>
      <div className="mt-6">
        <ToolRecyclebinCourseModal emptyState={true} />
      </div>
    </div>
  );
};

