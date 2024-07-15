"use client";
import { CompleteAssignFeedbackEditpdfRot } from "@soco/assignment-db/schema/assignFeedbackEditpdfRots";
import { trpc } from "@/lib/trpc/client";
import AssignFeedbackEditpdfRotModal from "./AssignFeedbackEditpdfRotModal";


export default function AssignFeedbackEditpdfRotList({ assignFeedbackEditpdfRots }: { assignFeedbackEditpdfRots: CompleteAssignFeedbackEditpdfRot[] }) {
  const { data: a } = trpc.assignFeedbackEditpdfRots.getAssignFeedbackEditpdfRots.useQuery(undefined, {
    initialData: { assignFeedbackEditpdfRots },
    refetchOnMount: false,
  });

  if (a.assignFeedbackEditpdfRots.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {a.assignFeedbackEditpdfRots.map((assignFeedbackEditpdfRot) => (
        <AssignFeedbackEditpdfRot assignFeedbackEditpdfRot={assignFeedbackEditpdfRot} key={assignFeedbackEditpdfRot.id} />
      ))}
    </ul>
  );
}

const AssignFeedbackEditpdfRot = ({ assignFeedbackEditpdfRot }: { assignFeedbackEditpdfRot: CompleteAssignFeedbackEditpdfRot }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{assignFeedbackEditpdfRot.degree}</div>
      </div>
      <AssignFeedbackEditpdfRotModal assignFeedbackEditpdfRot={assignFeedbackEditpdfRot} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No assign feedback editpdf rots
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new assign feedback editpdf rot.
      </p>
      <div className="mt-6">
        <AssignFeedbackEditpdfRotModal emptyState={true} />
      </div>
    </div>
  );
};

