"use client";
import { CompleteCompetencyUserCompCourse } from "@soco/competency-db/schema/competencyUserCompCourses";
import { trpc } from "@/lib/trpc/client";
import CompetencyUserCompCourseModal from "./CompetencyUserCompCourseModal";


export default function CompetencyUserCompCourseList({ competencyUserCompCourses }: { competencyUserCompCourses: CompleteCompetencyUserCompCourse[] }) {
  const { data: c } = trpc.competencyUserCompCourses.getCompetencyUserCompCourses.useQuery(undefined, {
    initialData: { competencyUserCompCourses },
    refetchOnMount: false,
  });

  if (c.competencyUserCompCourses.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {c.competencyUserCompCourses.map((competencyUserCompCourse) => (
        <CompetencyUserCompCourse competencyUserCompCourse={competencyUserCompCourse} key={competencyUserCompCourse.competencyUserCompCourse.id} />
      ))}
    </ul>
  );
}

const CompetencyUserCompCourse = ({ competencyUserCompCourse }: { competencyUserCompCourse: CompleteCompetencyUserCompCourse }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{competencyUserCompCourse.competencyUserCompCourse.competencyId}</div>
      </div>
      <CompetencyUserCompCourseModal competencyUserCompCourse={competencyUserCompCourse.competencyUserCompCourse} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No competency user comp courses
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new competency user comp course.
      </p>
      <div className="mt-6">
        <CompetencyUserCompCourseModal emptyState={true} />
      </div>
    </div>
  );
};

