"use client";
import { CompleteScormSeqRollupRuleCond } from "@soco/scorm-db/schema/scormSeqRollupRuleConds";
import { trpc } from "@/lib/trpc/client";
import ScormSeqRollupRuleCondModal from "./ScormSeqRollupRuleCondModal";


export default function ScormSeqRollupRuleCondList({ scormSeqRollupRuleConds }: { scormSeqRollupRuleConds: CompleteScormSeqRollupRuleCond[] }) {
  const { data: s } = trpc.scormSeqRollupRuleConds.getScormSeqRollupRuleConds.useQuery(undefined, {
    initialData: { scormSeqRollupRuleConds },
    refetchOnMount: false,
  });

  if (s.scormSeqRollupRuleConds.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {s.scormSeqRollupRuleConds.map((scormSeqRollupRuleCond) => (
        <ScormSeqRollupRuleCond scormSeqRollupRuleCond={scormSeqRollupRuleCond} key={scormSeqRollupRuleCond.scormSeqRollupRuleCond.id} />
      ))}
    </ul>
  );
}

const ScormSeqRollupRuleCond = ({ scormSeqRollupRuleCond }: { scormSeqRollupRuleCond: CompleteScormSeqRollupRuleCond }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{scormSeqRollupRuleCond.scormSeqRollupRuleCond.cond}</div>
      </div>
      <ScormSeqRollupRuleCondModal scormSeqRollupRuleCond={scormSeqRollupRuleCond.scormSeqRollupRuleCond} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No scorm seq rollup rule conds
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new scorm seq rollup rule cond.
      </p>
      <div className="mt-6">
        <ScormSeqRollupRuleCondModal emptyState={true} />
      </div>
    </div>
  );
};

