"use client";
import { CompleteToolPolicyVersion } from "@soco/tool-policy-db/schema/toolPolicyVersions";
import { trpc } from "@/lib/trpc/client";
import ToolPolicyVersionModal from "./ToolPolicyVersionModal";


export default function ToolPolicyVersionList({ toolPolicyVersions }: { toolPolicyVersions: CompleteToolPolicyVersion[] }) {
  const { data: t } = trpc.toolPolicyVersions.getToolPolicyVersions.useQuery(undefined, {
    initialData: { toolPolicyVersions },
    refetchOnMount: false,
  });

  if (t.toolPolicyVersions.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {t.toolPolicyVersions.map((toolPolicyVersion) => (
        <ToolPolicyVersion toolPolicyVersion={toolPolicyVersion} key={toolPolicyVersion.toolPolicyVersion.id} />
      ))}
    </ul>
  );
}

const ToolPolicyVersion = ({ toolPolicyVersion }: { toolPolicyVersion: CompleteToolPolicyVersion }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{toolPolicyVersion.toolPolicyVersion.agreementStyle}</div>
      </div>
      <ToolPolicyVersionModal toolPolicyVersion={toolPolicyVersion.toolPolicyVersion} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No tool policy versions
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new tool policy version.
      </p>
      <div className="mt-6">
        <ToolPolicyVersionModal emptyState={true} />
      </div>
    </div>
  );
};

