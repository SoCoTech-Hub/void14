import ScormSeqRollupRuleCondList from "@/components/scormSeqRollupRuleConds/ScormSeqRollupRuleCondList";
import NewScormSeqRollupRuleCondModal from "@/components/scormSeqRollupRuleConds/ScormSeqRollupRuleCondModal";
import { api } from "@/lib/trpc/api";

export default async function ScormSeqRollupRuleConds() {
  const { scormSeqRollupRuleConds } = await api.scormSeqRollupRuleConds.getScormSeqRollupRuleConds.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Scorm Seq Rollup Rule Conds</h1>
        <NewScormSeqRollupRuleCondModal />
      </div>
      <ScormSeqRollupRuleCondList scormSeqRollupRuleConds={scormSeqRollupRuleConds} />
    </main>
  );
}
