"use client";
import { CompleteToolPolicy } from "@soco/tool-policy-db/schema/toolPolicies";
import { trpc } from "@/lib/trpc/client";
import ToolPolicyModal from "./ToolPolicyModal";


export default function ToolPolicyList({ toolPolicies }: { toolPolicies: CompleteToolPolicy[] }) {
  const { data: t } = trpc.toolPolicies.getToolPolicies.useQuery(undefined, {
    initialData: { toolPolicies },
    refetchOnMount: false,
  });

  if (t.toolPolicies.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {t.toolPolicies.map((toolPolicy) => (
        <ToolPolicy toolPolicy={toolPolicy} key={toolPolicy.id} />
      ))}
    </ul>
  );
}

const ToolPolicy = ({ toolPolicy }: { toolPolicy: CompleteToolPolicy }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{toolPolicy.currentVersionId}</div>
      </div>
      <ToolPolicyModal toolPolicy={toolPolicy} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No tool policies
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new tool policy.
      </p>
      <div className="mt-6">
        <ToolPolicyModal emptyState={true} />
      </div>
    </div>
  );
};

