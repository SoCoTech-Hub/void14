"use client";
import { CompleteScormSeqRollupRule } from "@/lib/db/schema/scormSeqRollupRules";
import { trpc } from "@/lib/trpc/client";
import ScormSeqRollupRuleModal from "./ScormSeqRollupRuleModal";


export default function ScormSeqRollupRuleList({ scormSeqRollupRules }: { scormSeqRollupRules: CompleteScormSeqRollupRule[] }) {
  const { data: s } = trpc.scormSeqRollupRules.getScormSeqRollupRules.useQuery(undefined, {
    initialData: { scormSeqRollupRules },
    refetchOnMount: false,
  });

  if (s.scormSeqRollupRules.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {s.scormSeqRollupRules.map((scormSeqRollupRule) => (
        <ScormSeqRollupRule scormSeqRollupRule={scormSeqRollupRule} key={scormSeqRollupRule.scormSeqRollupRule.id} />
      ))}
    </ul>
  );
}

const ScormSeqRollupRule = ({ scormSeqRollupRule }: { scormSeqRollupRule: CompleteScormSeqRollupRule }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{scormSeqRollupRule.scormSeqRollupRule.action}</div>
      </div>
      <ScormSeqRollupRuleModal scormSeqRollupRule={scormSeqRollupRule.scormSeqRollupRule} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No scorm seq rollup rules
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new scorm seq rollup rule.
      </p>
      <div className="mt-6">
        <ScormSeqRollupRuleModal emptyState={true} />
      </div>
    </div>
  );
};

