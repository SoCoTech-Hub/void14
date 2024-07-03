"use client";
import { CompleteRoleContextLevel } from "@/lib/db/schema/roleContextLevels";
import { trpc } from "@/lib/trpc/client";
import RoleContextLevelModal from "./RoleContextLevelModal";


export default function RoleContextLevelList({ roleContextLevels }: { roleContextLevels: CompleteRoleContextLevel[] }) {
  const { data: r } = trpc.roleContextLevels.getRoleContextLevels.useQuery(undefined, {
    initialData: { roleContextLevels },
    refetchOnMount: false,
  });

  if (r.roleContextLevels.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {r.roleContextLevels.map((roleContextLevel) => (
        <RoleContextLevel roleContextLevel={roleContextLevel} key={roleContextLevel.roleContextLevel.id} />
      ))}
    </ul>
  );
}

const RoleContextLevel = ({ roleContextLevel }: { roleContextLevel: CompleteRoleContextLevel }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{roleContextLevel.roleContextLevel.contextLevel}</div>
      </div>
      <RoleContextLevelModal roleContextLevel={roleContextLevel.roleContextLevel} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No role context levels
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new role context level.
      </p>
      <div className="mt-6">
        <RoleContextLevelModal emptyState={true} />
      </div>
    </div>
  );
};

