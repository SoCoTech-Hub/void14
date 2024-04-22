"use client";
import { CompleteAssignOverride } from "@/lib/db/schema/assignOverrides";
import { trpc } from "@/lib/trpc/client";
import AssignOverrideModal from "./AssignOverrideModal";


export default function AssignOverrideList({ assignOverrides }: { assignOverrides: CompleteAssignOverride[] }) {
  const { data: a } = trpc.assignOverrides.getAssignOverrides.useQuery(undefined, {
    initialData: { assignOverrides },
    refetchOnMount: false,
  });

  if (a.assignOverrides.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {a.assignOverrides.map((assignOverride) => (
        <AssignOverride assignOverride={assignOverride} key={assignOverride.assignOverride.id} />
      ))}
    </ul>
  );
}

const AssignOverride = ({ assignOverride }: { assignOverride: CompleteAssignOverride }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{assignOverride.assignOverride.allowSubmissionsFromDate.toString()}</div>
      </div>
      <AssignOverrideModal assignOverride={assignOverride.assignOverride} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No assign overrides
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new assign override.
      </p>
      <div className="mt-6">
        <AssignOverrideModal emptyState={true} />
      </div>
    </div>
  );
};

