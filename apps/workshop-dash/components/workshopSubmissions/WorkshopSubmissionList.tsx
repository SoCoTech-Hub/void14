"use client";
import { CompleteWorkshopSubmission } from "@/lib/db/schema/workshopSubmissions";
import { trpc } from "@/lib/trpc/client";
import WorkshopSubmissionModal from "./WorkshopSubmissionModal";


export default function WorkshopSubmissionList({ workshopSubmissions }: { workshopSubmissions: CompleteWorkshopSubmission[] }) {
  const { data: w } = trpc.workshopSubmissions.getWorkshopSubmissions.useQuery(undefined, {
    initialData: { workshopSubmissions },
    refetchOnMount: false,
  });

  if (w.workshopSubmissions.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {w.workshopSubmissions.map((workshopSubmission) => (
        <WorkshopSubmission workshopSubmission={workshopSubmission} key={workshopSubmission.workshopSubmission.id} />
      ))}
    </ul>
  );
}

const WorkshopSubmission = ({ workshopSubmission }: { workshopSubmission: CompleteWorkshopSubmission }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{workshopSubmission.workshopSubmission.attachment}</div>
      </div>
      <WorkshopSubmissionModal workshopSubmission={workshopSubmission.workshopSubmission} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No workshop submissions
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new workshop submission.
      </p>
      <div className="mt-6">
        <WorkshopSubmissionModal emptyState={true} />
      </div>
    </div>
  );
};

