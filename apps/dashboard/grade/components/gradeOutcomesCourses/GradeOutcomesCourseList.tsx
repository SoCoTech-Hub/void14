"use client";
import { CompleteGradeOutcomesCourse } from "@soco/grade-db/schema/gradeOutcomesCourses";
import { trpc } from "@/lib/trpc/client";
import GradeOutcomesCourseModal from "./GradeOutcomesCourseModal";


export default function GradeOutcomesCourseList({ gradeOutcomesCourses }: { gradeOutcomesCourses: CompleteGradeOutcomesCourse[] }) {
  const { data: g } = trpc.gradeOutcomesCourses.getGradeOutcomesCourses.useQuery(undefined, {
    initialData: { gradeOutcomesCourses },
    refetchOnMount: false,
  });

  if (g.gradeOutcomesCourses.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {g.gradeOutcomesCourses.map((gradeOutcomesCourse) => (
        <GradeOutcomesCourse gradeOutcomesCourse={gradeOutcomesCourse} key={gradeOutcomesCourse.gradeOutcomesCourse.id} />
      ))}
    </ul>
  );
}

const GradeOutcomesCourse = ({ gradeOutcomesCourse }: { gradeOutcomesCourse: CompleteGradeOutcomesCourse }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{gradeOutcomesCourse.gradeOutcomesCourse.gradeOutcomeId}</div>
      </div>
      <GradeOutcomesCourseModal gradeOutcomesCourse={gradeOutcomesCourse.gradeOutcomesCourse} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No grade outcomes courses
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new grade outcomes course.
      </p>
      <div className="mt-6">
        <GradeOutcomesCourseModal emptyState={true} />
      </div>
    </div>
  );
};

