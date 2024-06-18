"use client";
import { CompleteRoleAllowOverride } from "@/lib/db/schema/roleAllowOverrides";
import { trpc } from "@/lib/trpc/client";
import RoleAllowOverrideModal from "./RoleAllowOverrideModal";


export default function RoleAllowOverrideList({ roleAllowOverrides }: { roleAllowOverrides: CompleteRoleAllowOverride[] }) {
  const { data: r } = trpc.roleAllowOverrides.getRoleAllowOverrides.useQuery(undefined, {
    initialData: { roleAllowOverrides },
    refetchOnMount: false,
  });

  if (r.roleAllowOverrides.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {r.roleAllowOverrides.map((roleAllowOverride) => (
        <RoleAllowOverride roleAllowOverride={roleAllowOverride} key={roleAllowOverride.roleAllowOverride.id} />
      ))}
    </ul>
  );
}

const RoleAllowOverride = ({ roleAllowOverride }: { roleAllowOverride: CompleteRoleAllowOverride }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{roleAllowOverride.roleAllowOverride.roleId}</div>
      </div>
      <RoleAllowOverrideModal roleAllowOverride={roleAllowOverride.roleAllowOverride} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No role allow overrides
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new role allow override.
      </p>
      <div className="mt-6">
        <RoleAllowOverrideModal emptyState={true} />
      </div>
    </div>
  );
};

