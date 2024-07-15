"use client";
import { CompleteRoleCapability } from "@soco/role-db/schema/roleCapabilities";
import { trpc } from "@/lib/trpc/client";
import RoleCapabilityModal from "./RoleCapabilityModal";


export default function RoleCapabilityList({ roleCapabilities }: { roleCapabilities: CompleteRoleCapability[] }) {
  const { data: r } = trpc.roleCapabilities.getRoleCapabilities.useQuery(undefined, {
    initialData: { roleCapabilities },
    refetchOnMount: false,
  });

  if (r.roleCapabilities.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {r.roleCapabilities.map((roleCapability) => (
        <RoleCapability roleCapability={roleCapability} key={roleCapability.roleCapability.id} />
      ))}
    </ul>
  );
}

const RoleCapability = ({ roleCapability }: { roleCapability: CompleteRoleCapability }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{roleCapability.roleCapability.capability}</div>
      </div>
      <RoleCapabilityModal roleCapability={roleCapability.roleCapability} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No role capabilities
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new role capability.
      </p>
      <div className="mt-6">
        <RoleCapabilityModal emptyState={true} />
      </div>
    </div>
  );
};

