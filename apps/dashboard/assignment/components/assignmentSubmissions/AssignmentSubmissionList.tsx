"use client";
import { CompleteAssignmentSubmission } from "@soco/assignment-db/schema/assignmentSubmissions";
import { trpc } from "@/lib/trpc/client";
import AssignmentSubmissionModal from "./AssignmentSubmissionModal";


export default function AssignmentSubmissionList({ assignmentSubmissions }: { assignmentSubmissions: CompleteAssignmentSubmission[] }) {
  const { data: a } = trpc.assignmentSubmissions.getAssignmentSubmissions.useQuery(undefined, {
    initialData: { assignmentSubmissions },
    refetchOnMount: false,
  });

  if (a.assignmentSubmissions.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {a.assignmentSubmissions.map((assignmentSubmission) => (
        <AssignmentSubmission assignmentSubmission={assignmentSubmission} key={assignmentSubmission.assignmentSubmission.id} />
      ))}
    </ul>
  );
}

const AssignmentSubmission = ({ assignmentSubmission }: { assignmentSubmission: CompleteAssignmentSubmission }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{assignmentSubmission.assignmentSubmission.assignmentId}</div>
      </div>
      <AssignmentSubmissionModal assignmentSubmission={assignmentSubmission.assignmentSubmission} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No assignment submissions
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new assignment submission.
      </p>
      <div className="mt-6">
        <AssignmentSubmissionModal emptyState={true} />
      </div>
    </div>
  );
};

