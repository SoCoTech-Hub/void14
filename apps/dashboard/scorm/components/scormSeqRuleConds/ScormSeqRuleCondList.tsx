"use client";
import { CompleteScormSeqRuleCond } from "@/lib/db/schema/scormSeqRuleConds";
import { trpc } from "@/lib/trpc/client";
import ScormSeqRuleCondModal from "./ScormSeqRuleCondModal";


export default function ScormSeqRuleCondList({ scormSeqRuleConds }: { scormSeqRuleConds: CompleteScormSeqRuleCond[] }) {
  const { data: s } = trpc.scormSeqRuleConds.getScormSeqRuleConds.useQuery(undefined, {
    initialData: { scormSeqRuleConds },
    refetchOnMount: false,
  });

  if (s.scormSeqRuleConds.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {s.scormSeqRuleConds.map((scormSeqRuleCond) => (
        <ScormSeqRuleCond scormSeqRuleCond={scormSeqRuleCond} key={scormSeqRuleCond.scormSeqRuleCond.id} />
      ))}
    </ul>
  );
}

const ScormSeqRuleCond = ({ scormSeqRuleCond }: { scormSeqRuleCond: CompleteScormSeqRuleCond }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{scormSeqRuleCond.scormSeqRuleCond.action}</div>
      </div>
      <ScormSeqRuleCondModal scormSeqRuleCond={scormSeqRuleCond.scormSeqRuleCond} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No scorm seq rule conds
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new scorm seq rule cond.
      </p>
      <div className="mt-6">
        <ScormSeqRuleCondModal emptyState={true} />
      </div>
    </div>
  );
};

