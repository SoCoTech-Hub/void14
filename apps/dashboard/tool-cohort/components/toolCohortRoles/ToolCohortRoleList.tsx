"use client";
import { CompleteToolCohortRole } from "@/lib/db/schema/toolCohortRoles";
import { trpc } from "@/lib/trpc/client";
import ToolCohortRoleModal from "./ToolCohortRoleModal";


export default function ToolCohortRoleList({ toolCohortRoles }: { toolCohortRoles: CompleteToolCohortRole[] }) {
  const { data: t } = trpc.toolCohortRoles.getToolCohortRoles.useQuery(undefined, {
    initialData: { toolCohortRoles },
    refetchOnMount: false,
  });

  if (t.toolCohortRoles.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {t.toolCohortRoles.map((toolCohortRole) => (
        <ToolCohortRole toolCohortRole={toolCohortRole} key={toolCohortRole.id} />
      ))}
    </ul>
  );
}

const ToolCohortRole = ({ toolCohortRole }: { toolCohortRole: CompleteToolCohortRole }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{toolCohortRole.cohortId}</div>
      </div>
      <ToolCohortRoleModal toolCohortRole={toolCohortRole} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No tool cohort roles
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new tool cohort role.
      </p>
      <div className="mt-6">
        <ToolCohortRoleModal emptyState={true} />
      </div>
    </div>
  );
};

