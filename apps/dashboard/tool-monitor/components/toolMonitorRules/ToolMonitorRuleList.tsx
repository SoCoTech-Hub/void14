"use client";
import { CompleteToolMonitorRule } from "@/lib/db/schema/toolMonitorRules";
import { trpc } from "@/lib/trpc/client";
import ToolMonitorRuleModal from "./ToolMonitorRuleModal";


export default function ToolMonitorRuleList({ toolMonitorRules }: { toolMonitorRules: CompleteToolMonitorRule[] }) {
  const { data: t } = trpc.toolMonitorRules.getToolMonitorRules.useQuery(undefined, {
    initialData: { toolMonitorRules },
    refetchOnMount: false,
  });

  if (t.toolMonitorRules.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {t.toolMonitorRules.map((toolMonitorRule) => (
        <ToolMonitorRule toolMonitorRule={toolMonitorRule} key={toolMonitorRule.id} />
      ))}
    </ul>
  );
}

const ToolMonitorRule = ({ toolMonitorRule }: { toolMonitorRule: CompleteToolMonitorRule }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{toolMonitorRule.courseId}</div>
      </div>
      <ToolMonitorRuleModal toolMonitorRule={toolMonitorRule} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No tool monitor rules
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new tool monitor rule.
      </p>
      <div className="mt-6">
        <ToolMonitorRuleModal emptyState={true} />
      </div>
    </div>
  );
};

