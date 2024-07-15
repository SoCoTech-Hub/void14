"use client";
import { CompleteRole } from "@soco/role-db/schema/roles";
import { trpc } from "@/lib/trpc/client";
import RoleModal from "./RoleModal";


export default function RoleList({ roles }: { roles: CompleteRole[] }) {
  const { data: r } = trpc.roles.getRoles.useQuery(undefined, {
    initialData: { roles },
    refetchOnMount: false,
  });

  if (r.roles.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {r.roles.map((role) => (
        <Role role={role} key={role.id} />
      ))}
    </ul>
  );
}

const Role = ({ role }: { role: CompleteRole }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{role.archeType}</div>
      </div>
      <RoleModal role={role} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No roles
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new role.
      </p>
      <div className="mt-6">
        <RoleModal emptyState={true} />
      </div>
    </div>
  );
};

