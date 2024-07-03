"use client";
import { CompleteAssignGrade } from "@/lib/db/schema/assignGrades";
import { trpc } from "@/lib/trpc/client";
import AssignGradeModal from "./AssignGradeModal";


export default function AssignGradeList({ assignGrades }: { assignGrades: CompleteAssignGrade[] }) {
  const { data: a } = trpc.assignGrades.getAssignGrades.useQuery(undefined, {
    initialData: { assignGrades },
    refetchOnMount: false,
  });

  if (a.assignGrades.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {a.assignGrades.map((assignGrade) => (
        <AssignGrade assignGrade={assignGrade} key={assignGrade.assignGrade.id} />
      ))}
    </ul>
  );
}

const AssignGrade = ({ assignGrade }: { assignGrade: CompleteAssignGrade }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{assignGrade.assignGrade.assignmentId}</div>
      </div>
      <AssignGradeModal assignGrade={assignGrade.assignGrade} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No assign grades
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new assign grade.
      </p>
      <div className="mt-6">
        <AssignGradeModal emptyState={true} />
      </div>
    </div>
  );
};

