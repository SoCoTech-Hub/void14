"use client";
import { CompleteAssignSubmission } from "@/lib/db/schema/assignSubmissions";
import { trpc } from "@/lib/trpc/client";
import AssignSubmissionModal from "./AssignSubmissionModal";


export default function AssignSubmissionList({ assignSubmissions }: { assignSubmissions: CompleteAssignSubmission[] }) {
  const { data: a } = trpc.assignSubmissions.getAssignSubmissions.useQuery(undefined, {
    initialData: { assignSubmissions },
    refetchOnMount: false,
  });

  if (a.assignSubmissions.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {a.assignSubmissions.map((assignSubmission) => (
        <AssignSubmission assignSubmission={assignSubmission} key={assignSubmission.assignSubmission.id} />
      ))}
    </ul>
  );
}

const AssignSubmission = ({ assignSubmission }: { assignSubmission: CompleteAssignSubmission }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{assignSubmission.assignSubmission.assignmentId}</div>
      </div>
      <AssignSubmissionModal assignSubmission={assignSubmission.assignSubmission} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No assign submissions
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new assign submission.
      </p>
      <div className="mt-6">
        <AssignSubmissionModal emptyState={true} />
      </div>
    </div>
  );
};

