"use client";
import { CompleteWorkshopAssessment } from "@soco/workshop-db/schema/workshopAssessments";
import { trpc } from "@/lib/trpc/client";
import WorkshopAssessmentModal from "./WorkshopAssessmentModal";


export default function WorkshopAssessmentList({ workshopAssessments }: { workshopAssessments: CompleteWorkshopAssessment[] }) {
  const { data: w } = trpc.workshopAssessments.getWorkshopAssessments.useQuery(undefined, {
    initialData: { workshopAssessments },
    refetchOnMount: false,
  });

  if (w.workshopAssessments.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {w.workshopAssessments.map((workshopAssessment) => (
        <WorkshopAssessment workshopAssessment={workshopAssessment} key={workshopAssessment.id} />
      ))}
    </ul>
  );
}

const WorkshopAssessment = ({ workshopAssessment }: { workshopAssessment: CompleteWorkshopAssessment }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{workshopAssessment.feedbackAuthor}</div>
      </div>
      <WorkshopAssessmentModal workshopAssessment={workshopAssessment} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No workshop assessments
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new workshop assessment.
      </p>
      <div className="mt-6">
        <WorkshopAssessmentModal emptyState={true} />
      </div>
    </div>
  );
};

