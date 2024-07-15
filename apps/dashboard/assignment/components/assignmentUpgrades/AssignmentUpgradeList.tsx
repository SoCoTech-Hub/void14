"use client";
import { CompleteAssignmentUpgrade } from "@soco/assignment-db/schema/assignmentUpgrades";
import { trpc } from "@/lib/trpc/client";
import AssignmentUpgradeModal from "./AssignmentUpgradeModal";


export default function AssignmentUpgradeList({ assignmentUpgrades }: { assignmentUpgrades: CompleteAssignmentUpgrade[] }) {
  const { data: a } = trpc.assignmentUpgrades.getAssignmentUpgrades.useQuery(undefined, {
    initialData: { assignmentUpgrades },
    refetchOnMount: false,
  });

  if (a.assignmentUpgrades.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {a.assignmentUpgrades.map((assignmentUpgrade) => (
        <AssignmentUpgrade assignmentUpgrade={assignmentUpgrade} key={assignmentUpgrade.id} />
      ))}
    </ul>
  );
}

const AssignmentUpgrade = ({ assignmentUpgrade }: { assignmentUpgrade: CompleteAssignmentUpgrade }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{assignmentUpgrade.newCmId}</div>
      </div>
      <AssignmentUpgradeModal assignmentUpgrade={assignmentUpgrade} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No assignment upgrades
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new assignment upgrade.
      </p>
      <div className="mt-6">
        <AssignmentUpgradeModal emptyState={true} />
      </div>
    </div>
  );
};

