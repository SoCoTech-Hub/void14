"use client";
import { CompleteScormSeqRuleCondition } from "@soco/scorm-db/schema/scormSeqRuleConditions";
import { trpc } from "@/lib/trpc/client";
import ScormSeqRuleConditionModal from "./ScormSeqRuleConditionModal";


export default function ScormSeqRuleConditionList({ scormSeqRuleConditions }: { scormSeqRuleConditions: CompleteScormSeqRuleCondition[] }) {
  const { data: s } = trpc.scormSeqRuleConditions.getScormSeqRuleConditions.useQuery(undefined, {
    initialData: { scormSeqRuleConditions },
    refetchOnMount: false,
  });

  if (s.scormSeqRuleConditions.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {s.scormSeqRuleConditions.map((scormSeqRuleCondition) => (
        <ScormSeqRuleCondition scormSeqRuleCondition={scormSeqRuleCondition} key={scormSeqRuleCondition.scormSeqRuleCondition.id} />
      ))}
    </ul>
  );
}

const ScormSeqRuleCondition = ({ scormSeqRuleCondition }: { scormSeqRuleCondition: CompleteScormSeqRuleCondition }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{scormSeqRuleCondition.scormSeqRuleCondition.cond}</div>
      </div>
      <ScormSeqRuleConditionModal scormSeqRuleCondition={scormSeqRuleCondition.scormSeqRuleCondition} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No scorm seq rule conditions
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new scorm seq rule condition.
      </p>
      <div className="mt-6">
        <ScormSeqRuleConditionModal emptyState={true} />
      </div>
    </div>
  );
};

