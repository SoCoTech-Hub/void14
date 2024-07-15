"use client";
import { CompleteRoleName } from "@soco/role-db/schema/roleNames";
import { trpc } from "@/lib/trpc/client";
import RoleNameModal from "./RoleNameModal";


export default function RoleNameList({ roleNames }: { roleNames: CompleteRoleName[] }) {
  const { data: r } = trpc.roleNames.getRoleNames.useQuery(undefined, {
    initialData: { roleNames },
    refetchOnMount: false,
  });

  if (r.roleNames.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {r.roleNames.map((roleName) => (
        <RoleName roleName={roleName} key={roleName.roleName.id} />
      ))}
    </ul>
  );
}

const RoleName = ({ roleName }: { roleName: CompleteRoleName }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{roleName.roleName.contextId}</div>
      </div>
      <RoleNameModal roleName={roleName.roleName} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No role names
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new role name.
      </p>
      <div className="mt-6">
        <RoleNameModal emptyState={true} />
      </div>
    </div>
  );
};

