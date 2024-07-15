"use client";
import { CompleteCourseFormatOption } from "@soco/course-db/schema/courseFormatOptions";
import { trpc } from "@/lib/trpc/client";
import CourseFormatOptionModal from "./CourseFormatOptionModal";


export default function CourseFormatOptionList({ courseFormatOptions }: { courseFormatOptions: CompleteCourseFormatOption[] }) {
  const { data: c } = trpc.courseFormatOptions.getCourseFormatOptions.useQuery(undefined, {
    initialData: { courseFormatOptions },
    refetchOnMount: false,
  });

  if (c.courseFormatOptions.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {c.courseFormatOptions.map((courseFormatOption) => (
        <CourseFormatOption courseFormatOption={courseFormatOption} key={courseFormatOption.courseFormatOption.id} />
      ))}
    </ul>
  );
}

const CourseFormatOption = ({ courseFormatOption }: { courseFormatOption: CompleteCourseFormatOption }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{courseFormatOption.courseFormatOption.courseId}</div>
      </div>
      <CourseFormatOptionModal courseFormatOption={courseFormatOption.courseFormatOption} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No course format options
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new course format option.
      </p>
      <div className="mt-6">
        <CourseFormatOptionModal emptyState={true} />
      </div>
    </div>
  );
};

