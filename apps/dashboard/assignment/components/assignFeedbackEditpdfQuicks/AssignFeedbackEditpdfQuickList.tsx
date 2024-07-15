"use client";
import { CompleteAssignFeedbackEditpdfQuick } from "@soco/assignment-db/schema/assignFeedbackEditpdfQuicks";
import { trpc } from "@/lib/trpc/client";
import AssignFeedbackEditpdfQuickModal from "./AssignFeedbackEditpdfQuickModal";


export default function AssignFeedbackEditpdfQuickList({ assignFeedbackEditpdfQuicks }: { assignFeedbackEditpdfQuicks: CompleteAssignFeedbackEditpdfQuick[] }) {
  const { data: a } = trpc.assignFeedbackEditpdfQuicks.getAssignFeedbackEditpdfQuicks.useQuery(undefined, {
    initialData: { assignFeedbackEditpdfQuicks },
    refetchOnMount: false,
  });

  if (a.assignFeedbackEditpdfQuicks.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {a.assignFeedbackEditpdfQuicks.map((assignFeedbackEditpdfQuick) => (
        <AssignFeedbackEditpdfQuick assignFeedbackEditpdfQuick={assignFeedbackEditpdfQuick} key={assignFeedbackEditpdfQuick.id} />
      ))}
    </ul>
  );
}

const AssignFeedbackEditpdfQuick = ({ assignFeedbackEditpdfQuick }: { assignFeedbackEditpdfQuick: CompleteAssignFeedbackEditpdfQuick }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{assignFeedbackEditpdfQuick.color}</div>
      </div>
      <AssignFeedbackEditpdfQuickModal assignFeedbackEditpdfQuick={assignFeedbackEditpdfQuick} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No assign feedback editpdf quicks
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new assign feedback editpdf quick.
      </p>
      <div className="mt-6">
        <AssignFeedbackEditpdfQuickModal emptyState={true} />
      </div>
    </div>
  );
};

