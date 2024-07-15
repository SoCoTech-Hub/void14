"use client";
import { CompleteGradeGrade } from "@soco/grade-db/schema/gradeGrades";
import { trpc } from "@/lib/trpc/client";
import GradeGradeModal from "./GradeGradeModal";


export default function GradeGradeList({ gradeGrades }: { gradeGrades: CompleteGradeGrade[] }) {
  const { data: g } = trpc.gradeGrades.getGradeGrades.useQuery(undefined, {
    initialData: { gradeGrades },
    refetchOnMount: false,
  });

  if (g.gradeGrades.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {g.gradeGrades.map((gradeGrade) => (
        <GradeGrade gradeGrade={gradeGrade} key={gradeGrade.id} />
      ))}
    </ul>
  );
}

const GradeGrade = ({ gradeGrade }: { gradeGrade: CompleteGradeGrade }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{gradeGrade.aggregationStatus}</div>
      </div>
      <GradeGradeModal gradeGrade={gradeGrade} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No grade grades
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new grade grade.
      </p>
      <div className="mt-6">
        <GradeGradeModal emptyState={true} />
      </div>
    </div>
  );
};

