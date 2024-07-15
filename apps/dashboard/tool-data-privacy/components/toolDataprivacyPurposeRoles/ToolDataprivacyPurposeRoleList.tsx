"use client";
import { CompleteToolDataprivacyPurposeRole } from "@soco/tool-data-privacy-db/schema/toolDataprivacyPurposeRoles";
import { trpc } from "@/lib/trpc/client";
import ToolDataprivacyPurposeRoleModal from "./ToolDataprivacyPurposeRoleModal";


export default function ToolDataprivacyPurposeRoleList({ toolDataprivacyPurposeRoles }: { toolDataprivacyPurposeRoles: CompleteToolDataprivacyPurposeRole[] }) {
  const { data: t } = trpc.toolDataprivacyPurposeRoles.getToolDataprivacyPurposeRoles.useQuery(undefined, {
    initialData: { toolDataprivacyPurposeRoles },
    refetchOnMount: false,
  });

  if (t.toolDataprivacyPurposeRoles.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {t.toolDataprivacyPurposeRoles.map((toolDataprivacyPurposeRole) => (
        <ToolDataprivacyPurposeRole toolDataprivacyPurposeRole={toolDataprivacyPurposeRole} key={toolDataprivacyPurposeRole.toolDataprivacyPurposeRole.id} />
      ))}
    </ul>
  );
}

const ToolDataprivacyPurposeRole = ({ toolDataprivacyPurposeRole }: { toolDataprivacyPurposeRole: CompleteToolDataprivacyPurposeRole }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{toolDataprivacyPurposeRole.toolDataprivacyPurposeRole.lawfulBases}</div>
      </div>
      <ToolDataprivacyPurposeRoleModal toolDataprivacyPurposeRole={toolDataprivacyPurposeRole.toolDataprivacyPurposeRole} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No tool dataprivacy purpose roles
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new tool dataprivacy purpose role.
      </p>
      <div className="mt-6">
        <ToolDataprivacyPurposeRoleModal emptyState={true} />
      </div>
    </div>
  );
};

