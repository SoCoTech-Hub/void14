"use client";
import { CompleteAssignSubmissionOnlineText } from "@soco/assignment-db/schema/assignSubmissionOnlineTexts";
import { trpc } from "@/lib/trpc/client";
import AssignSubmissionOnlineTextModal from "./AssignSubmissionOnlineTextModal";


export default function AssignSubmissionOnlineTextList({ assignSubmissionOnlineTexts }: { assignSubmissionOnlineTexts: CompleteAssignSubmissionOnlineText[] }) {
  const { data: a } = trpc.assignSubmissionOnlineTexts.getAssignSubmissionOnlineTexts.useQuery(undefined, {
    initialData: { assignSubmissionOnlineTexts },
    refetchOnMount: false,
  });

  if (a.assignSubmissionOnlineTexts.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {a.assignSubmissionOnlineTexts.map((assignSubmissionOnlineText) => (
        <AssignSubmissionOnlineText assignSubmissionOnlineText={assignSubmissionOnlineText} key={assignSubmissionOnlineText.assignSubmissionOnlineText.id} />
      ))}
    </ul>
  );
}

const AssignSubmissionOnlineText = ({ assignSubmissionOnlineText }: { assignSubmissionOnlineText: CompleteAssignSubmissionOnlineText }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{assignSubmissionOnlineText.assignSubmissionOnlineText.assignmentId}</div>
      </div>
      <AssignSubmissionOnlineTextModal assignSubmissionOnlineText={assignSubmissionOnlineText.assignSubmissionOnlineText} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No assign submission online texts
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new assign submission online text.
      </p>
      <div className="mt-6">
        <AssignSubmissionOnlineTextModal emptyState={true} />
      </div>
    </div>
  );
};

