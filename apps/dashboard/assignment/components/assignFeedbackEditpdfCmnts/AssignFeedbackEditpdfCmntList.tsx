"use client";
import { CompleteAssignFeedbackEditpdfCmnt } from "@/lib/db/schema/assignFeedbackEditpdfCmnts";
import { trpc } from "@/lib/trpc/client";
import AssignFeedbackEditpdfCmntModal from "./AssignFeedbackEditpdfCmntModal";


export default function AssignFeedbackEditpdfCmntList({ assignFeedbackEditpdfCmnts }: { assignFeedbackEditpdfCmnts: CompleteAssignFeedbackEditpdfCmnt[] }) {
  const { data: a } = trpc.assignFeedbackEditpdfCmnts.getAssignFeedbackEditpdfCmnts.useQuery(undefined, {
    initialData: { assignFeedbackEditpdfCmnts },
    refetchOnMount: false,
  });

  if (a.assignFeedbackEditpdfCmnts.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {a.assignFeedbackEditpdfCmnts.map((assignFeedbackEditpdfCmnt) => (
        <AssignFeedbackEditpdfCmnt assignFeedbackEditpdfCmnt={assignFeedbackEditpdfCmnt} key={assignFeedbackEditpdfCmnt.id} />
      ))}
    </ul>
  );
}

const AssignFeedbackEditpdfCmnt = ({ assignFeedbackEditpdfCmnt }: { assignFeedbackEditpdfCmnt: CompleteAssignFeedbackEditpdfCmnt }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{assignFeedbackEditpdfCmnt.color}</div>
      </div>
      <AssignFeedbackEditpdfCmntModal assignFeedbackEditpdfCmnt={assignFeedbackEditpdfCmnt} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No assign feedback editpdf cmnts
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new assign feedback editpdf cmnt.
      </p>
      <div className="mt-6">
        <AssignFeedbackEditpdfCmntModal emptyState={true} />
      </div>
    </div>
  );
};

