"use client";
import { CompleteRoleAllowAssign } from "@/lib/db/schema/roleAllowAssigns";
import { trpc } from "@/lib/trpc/client";
import RoleAllowAssignModal from "./RoleAllowAssignModal";


export default function RoleAllowAssignList({ roleAllowAssigns }: { roleAllowAssigns: CompleteRoleAllowAssign[] }) {
  const { data: r } = trpc.roleAllowAssigns.getRoleAllowAssigns.useQuery(undefined, {
    initialData: { roleAllowAssigns },
    refetchOnMount: false,
  });

  if (r.roleAllowAssigns.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {r.roleAllowAssigns.map((roleAllowAssign) => (
        <RoleAllowAssign roleAllowAssign={roleAllowAssign} key={roleAllowAssign.roleAllowAssign.id} />
      ))}
    </ul>
  );
}

const RoleAllowAssign = ({ roleAllowAssign }: { roleAllowAssign: CompleteRoleAllowAssign }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{roleAllowAssign.roleAllowAssign.roleId}</div>
      </div>
      <RoleAllowAssignModal roleAllowAssign={roleAllowAssign.roleAllowAssign} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No role allow assigns
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new role allow assign.
      </p>
      <div className="mt-6">
        <RoleAllowAssignModal emptyState={true} />
      </div>
    </div>
  );
};

