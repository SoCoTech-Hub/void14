"use client";
import { CompleteWorkshopGrade } from "@soco/workshop-db/schema/workshopGrades";
import { trpc } from "@/lib/trpc/client";
import WorkshopGradeModal from "./WorkshopGradeModal";


export default function WorkshopGradeList({ workshopGrades }: { workshopGrades: CompleteWorkshopGrade[] }) {
  const { data: w } = trpc.workshopGrades.getWorkshopGrades.useQuery(undefined, {
    initialData: { workshopGrades },
    refetchOnMount: false,
  });

  if (w.workshopGrades.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {w.workshopGrades.map((workshopGrade) => (
        <WorkshopGrade workshopGrade={workshopGrade} key={workshopGrade.id} />
      ))}
    </ul>
  );
}

const WorkshopGrade = ({ workshopGrade }: { workshopGrade: CompleteWorkshopGrade }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{workshopGrade.assessmentId}</div>
      </div>
      <WorkshopGradeModal workshopGrade={workshopGrade} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No workshop grades
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new workshop grade.
      </p>
      <div className="mt-6">
        <WorkshopGradeModal emptyState={true} />
      </div>
    </div>
  );
};

