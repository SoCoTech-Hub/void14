"use client";
import { CompleteRoleAssignment } from "@soco/role-db/schema/roleAssignments";
import { trpc } from "@/lib/trpc/client";
import RoleAssignmentModal from "./RoleAssignmentModal";


export default function RoleAssignmentList({ roleAssignments }: { roleAssignments: CompleteRoleAssignment[] }) {
  const { data: r } = trpc.roleAssignments.getRoleAssignments.useQuery(undefined, {
    initialData: { roleAssignments },
    refetchOnMount: false,
  });

  if (r.roleAssignments.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {r.roleAssignments.map((roleAssignment) => (
        <RoleAssignment roleAssignment={roleAssignment} key={roleAssignment.roleAssignment.id} />
      ))}
    </ul>
  );
}

const RoleAssignment = ({ roleAssignment }: { roleAssignment: CompleteRoleAssignment }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{roleAssignment.roleAssignment.component}</div>
      </div>
      <RoleAssignmentModal roleAssignment={roleAssignment.roleAssignment} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No role assignments
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new role assignment.
      </p>
      <div className="mt-6">
        <RoleAssignmentModal emptyState={true} />
      </div>
    </div>
  );
};

