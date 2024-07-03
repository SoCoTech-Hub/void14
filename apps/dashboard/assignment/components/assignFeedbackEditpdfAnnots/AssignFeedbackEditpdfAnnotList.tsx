"use client";
import { CompleteAssignFeedbackEditpdfAnnot } from "@/lib/db/schema/assignFeedbackEditpdfAnnots";
import { trpc } from "@/lib/trpc/client";
import AssignFeedbackEditpdfAnnotModal from "./AssignFeedbackEditpdfAnnotModal";


export default function AssignFeedbackEditpdfAnnotList({ assignFeedbackEditpdfAnnots }: { assignFeedbackEditpdfAnnots: CompleteAssignFeedbackEditpdfAnnot[] }) {
  const { data: a } = trpc.assignFeedbackEditpdfAnnots.getAssignFeedbackEditpdfAnnots.useQuery(undefined, {
    initialData: { assignFeedbackEditpdfAnnots },
    refetchOnMount: false,
  });

  if (a.assignFeedbackEditpdfAnnots.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {a.assignFeedbackEditpdfAnnots.map((assignFeedbackEditpdfAnnot) => (
        <AssignFeedbackEditpdfAnnot assignFeedbackEditpdfAnnot={assignFeedbackEditpdfAnnot} key={assignFeedbackEditpdfAnnot.id} />
      ))}
    </ul>
  );
}

const AssignFeedbackEditpdfAnnot = ({ assignFeedbackEditpdfAnnot }: { assignFeedbackEditpdfAnnot: CompleteAssignFeedbackEditpdfAnnot }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{assignFeedbackEditpdfAnnot.color}</div>
      </div>
      <AssignFeedbackEditpdfAnnotModal assignFeedbackEditpdfAnnot={assignFeedbackEditpdfAnnot} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No assign feedback editpdf annots
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new assign feedback editpdf annot.
      </p>
      <div className="mt-6">
        <AssignFeedbackEditpdfAnnotModal emptyState={true} />
      </div>
    </div>
  );
};

