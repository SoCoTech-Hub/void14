"use client";
import { CompleteRoleAllowSwitch } from "@soco/role-db/schema/roleAllowSwitches";
import { trpc } from "@/lib/trpc/client";
import RoleAllowSwitchModal from "./RoleAllowSwitchModal";


export default function RoleAllowSwitchList({ roleAllowSwitches }: { roleAllowSwitches: CompleteRoleAllowSwitch[] }) {
  const { data: r } = trpc.roleAllowSwitches.getRoleAllowSwitches.useQuery(undefined, {
    initialData: { roleAllowSwitches },
    refetchOnMount: false,
  });

  if (r.roleAllowSwitches.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {r.roleAllowSwitches.map((roleAllowSwitch) => (
        <RoleAllowSwitch roleAllowSwitch={roleAllowSwitch} key={roleAllowSwitch.roleAllowSwitch.id} />
      ))}
    </ul>
  );
}

const RoleAllowSwitch = ({ roleAllowSwitch }: { roleAllowSwitch: CompleteRoleAllowSwitch }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{roleAllowSwitch.roleAllowSwitch.roleId}</div>
      </div>
      <RoleAllowSwitchModal roleAllowSwitch={roleAllowSwitch.roleAllowSwitch} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No role allow switches
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new role allow switch.
      </p>
      <div className="mt-6">
        <RoleAllowSwitchModal emptyState={true} />
      </div>
    </div>
  );
};

