"use client";
import { CompleteCourseSection } from "@soco/course-db/schema/courseSections";
import { trpc } from "@/lib/trpc/client";
import CourseSectionModal from "./CourseSectionModal";


export default function CourseSectionList({ courseSections }: { courseSections: CompleteCourseSection[] }) {
  const { data: c } = trpc.courseSections.getCourseSections.useQuery(undefined, {
    initialData: { courseSections },
    refetchOnMount: false,
  });

  if (c.courseSections.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {c.courseSections.map((courseSection) => (
        <CourseSection courseSection={courseSection} key={courseSection.courseSection.id} />
      ))}
    </ul>
  );
}

const CourseSection = ({ courseSection }: { courseSection: CompleteCourseSection }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{courseSection.courseSection.courseId}</div>
      </div>
      <CourseSectionModal courseSection={courseSection.courseSection} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No course sections
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new course section.
      </p>
      <div className="mt-6">
        <CourseSectionModal emptyState={true} />
      </div>
    </div>
  );
};

