"use client";
import { CompleteAssign } from "@soco/assignment-db/schema/assigns";
import { trpc } from "@/lib/trpc/client";
import AssignModal from "./AssignModal";


export default function AssignList({ assigns }: { assigns: CompleteAssign[] }) {
  const { data: a } = trpc.assigns.getAssigns.useQuery(undefined, {
    initialData: { assigns },
    refetchOnMount: false,
  });

  if (a.assigns.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {a.assigns.map((assign) => (
        <Assign assign={assign} key={assign.id} />
      ))}
    </ul>
  );
}

const Assign = ({ assign }: { assign: CompleteAssign }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{assign.activity}</div>
      </div>
      <AssignModal assign={assign} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No assigns
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new assign.
      </p>
      <div className="mt-6">
        <AssignModal emptyState={true} />
      </div>
    </div>
  );
};

