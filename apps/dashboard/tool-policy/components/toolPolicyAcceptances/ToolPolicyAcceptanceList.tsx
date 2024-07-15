"use client";
import { CompleteToolPolicyAcceptance } from "@soco/tool-policy-db/schema/toolPolicyAcceptances";
import { trpc } from "@/lib/trpc/client";
import ToolPolicyAcceptanceModal from "./ToolPolicyAcceptanceModal";


export default function ToolPolicyAcceptanceList({ toolPolicyAcceptances }: { toolPolicyAcceptances: CompleteToolPolicyAcceptance[] }) {
  const { data: t } = trpc.toolPolicyAcceptances.getToolPolicyAcceptances.useQuery(undefined, {
    initialData: { toolPolicyAcceptances },
    refetchOnMount: false,
  });

  if (t.toolPolicyAcceptances.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {t.toolPolicyAcceptances.map((toolPolicyAcceptance) => (
        <ToolPolicyAcceptance toolPolicyAcceptance={toolPolicyAcceptance} key={toolPolicyAcceptance.id} />
      ))}
    </ul>
  );
}

const ToolPolicyAcceptance = ({ toolPolicyAcceptance }: { toolPolicyAcceptance: CompleteToolPolicyAcceptance }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{toolPolicyAcceptance.lang}</div>
      </div>
      <ToolPolicyAcceptanceModal toolPolicyAcceptance={toolPolicyAcceptance} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No tool policy acceptances
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new tool policy acceptance.
      </p>
      <div className="mt-6">
        <ToolPolicyAcceptanceModal emptyState={true} />
      </div>
    </div>
  );
};

