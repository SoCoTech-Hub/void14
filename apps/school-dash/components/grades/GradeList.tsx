"use client";
import { CompleteGrade } from "@/lib/db/schema/grades";
import { trpc } from "@/lib/trpc/client";
import GradeModal from "./GradeModal";


export default function GradeList({ grades }: { grades: CompleteGrade[] }) {
  const { data: g } = trpc.grades.getGrades.useQuery(undefined, {
    initialData: { grades },
    refetchOnMount: false,
  });

  if (g.grades.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {g.grades.map((grade) => (
        <Grade grade={grade} key={grade.id} />
      ))}
    </ul>
  );
}

const Grade = ({ grade }: { grade: CompleteGrade }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{grade.name}</div>
      </div>
      <GradeModal grade={grade} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No grades
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new grade.
      </p>
      <div className="mt-6">
        <GradeModal emptyState={true} />
      </div>
    </div>
  );
};

