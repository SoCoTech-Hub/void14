"use client";
import { CompleteCourseModule } from "@soco/course-db/schema/courseModules";
import { trpc } from "@/lib/trpc/client";
import CourseModuleModal from "./CourseModuleModal";


export default function CourseModuleList({ courseModules }: { courseModules: CompleteCourseModule[] }) {
  const { data: c } = trpc.courseModules.getCourseModules.useQuery(undefined, {
    initialData: { courseModules },
    refetchOnMount: false,
  });

  if (c.courseModules.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {c.courseModules.map((courseModule) => (
        <CourseModule courseModule={courseModule} key={courseModule.courseModule.id} />
      ))}
    </ul>
  );
}

const CourseModule = ({ courseModule }: { courseModule: CompleteCourseModule }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{courseModule.courseModule.added}</div>
      </div>
      <CourseModuleModal courseModule={courseModule.courseModule} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No course modules
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new course module.
      </p>
      <div className="mt-6">
        <CourseModuleModal emptyState={true} />
      </div>
    </div>
  );
};

