"use client";
import { CompleteAssignFeedbackComment } from "@soco/assignment-db/schema/assignFeedbackComments";
import { trpc } from "@/lib/trpc/client";
import AssignFeedbackCommentModal from "./AssignFeedbackCommentModal";


export default function AssignFeedbackCommentList({ assignFeedbackComments }: { assignFeedbackComments: CompleteAssignFeedbackComment[] }) {
  const { data: a } = trpc.assignFeedbackComments.getAssignFeedbackComments.useQuery(undefined, {
    initialData: { assignFeedbackComments },
    refetchOnMount: false,
  });

  if (a.assignFeedbackComments.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {a.assignFeedbackComments.map((assignFeedbackComment) => (
        <AssignFeedbackComment assignFeedbackComment={assignFeedbackComment} key={assignFeedbackComment.assignFeedbackComment.id} />
      ))}
    </ul>
  );
}

const AssignFeedbackComment = ({ assignFeedbackComment }: { assignFeedbackComment: CompleteAssignFeedbackComment }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{assignFeedbackComment.assignFeedbackComment.assignmentId}</div>
      </div>
      <AssignFeedbackCommentModal assignFeedbackComment={assignFeedbackComment.assignFeedbackComment} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No assign feedback comments
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new assign feedback comment.
      </p>
      <div className="mt-6">
        <AssignFeedbackCommentModal emptyState={true} />
      </div>
    </div>
  );
};

