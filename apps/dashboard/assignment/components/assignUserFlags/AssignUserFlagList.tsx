"use client";
import { CompleteAssignUserFlag } from "@soco/assignment-db/schema/assignUserFlags";
import { trpc } from "@/lib/trpc/client";
import AssignUserFlagModal from "./AssignUserFlagModal";


export default function AssignUserFlagList({ assignUserFlags }: { assignUserFlags: CompleteAssignUserFlag[] }) {
  const { data: a } = trpc.assignUserFlags.getAssignUserFlags.useQuery(undefined, {
    initialData: { assignUserFlags },
    refetchOnMount: false,
  });

  if (a.assignUserFlags.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {a.assignUserFlags.map((assignUserFlag) => (
        <AssignUserFlag assignUserFlag={assignUserFlag} key={assignUserFlag.assignUserFlag.id} />
      ))}
    </ul>
  );
}

const AssignUserFlag = ({ assignUserFlag }: { assignUserFlag: CompleteAssignUserFlag }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{assignUserFlag.assignUserFlag.allocatedMarker}</div>
      </div>
      <AssignUserFlagModal assignUserFlag={assignUserFlag.assignUserFlag} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No assign user flags
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new assign user flag.
      </p>
      <div className="mt-6">
        <AssignUserFlagModal emptyState={true} />
      </div>
    </div>
  );
};

