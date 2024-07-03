"use client";
import { CompleteAssignFeedbackEditpdfQueue } from "@/lib/db/schema/assignFeedbackEditpdfQueues";
import { trpc } from "@/lib/trpc/client";
import AssignFeedbackEditpdfQueueModal from "./AssignFeedbackEditpdfQueueModal";


export default function AssignFeedbackEditpdfQueueList({ assignFeedbackEditpdfQueues }: { assignFeedbackEditpdfQueues: CompleteAssignFeedbackEditpdfQueue[] }) {
  const { data: a } = trpc.assignFeedbackEditpdfQueues.getAssignFeedbackEditpdfQueues.useQuery(undefined, {
    initialData: { assignFeedbackEditpdfQueues },
    refetchOnMount: false,
  });

  if (a.assignFeedbackEditpdfQueues.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {a.assignFeedbackEditpdfQueues.map((assignFeedbackEditpdfQueue) => (
        <AssignFeedbackEditpdfQueue assignFeedbackEditpdfQueue={assignFeedbackEditpdfQueue} key={assignFeedbackEditpdfQueue.id} />
      ))}
    </ul>
  );
}

const AssignFeedbackEditpdfQueue = ({ assignFeedbackEditpdfQueue }: { assignFeedbackEditpdfQueue: CompleteAssignFeedbackEditpdfQueue }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{assignFeedbackEditpdfQueue.attemptedConversions}</div>
      </div>
      <AssignFeedbackEditpdfQueueModal assignFeedbackEditpdfQueue={assignFeedbackEditpdfQueue} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No assign feedback editpdf queues
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new assign feedback editpdf queue.
      </p>
      <div className="mt-6">
        <AssignFeedbackEditpdfQueueModal emptyState={true} />
      </div>
    </div>
  );
};

