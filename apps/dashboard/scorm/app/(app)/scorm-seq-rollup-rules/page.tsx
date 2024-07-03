import ScormSeqRollupRuleList from "@/components/scormSeqRollupRules/ScormSeqRollupRuleList";
import NewScormSeqRollupRuleModal from "@/components/scormSeqRollupRules/ScormSeqRollupRuleModal";
import { api } from "@/lib/trpc/api";

export default async function ScormSeqRollupRules() {
  const { scormSeqRollupRules } = await api.scormSeqRollupRules.getScormSeqRollupRules.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Scorm Seq Rollup Rules</h1>
        <NewScormSeqRollupRuleModal />
      </div>
      <ScormSeqRollupRuleList scormSeqRollupRules={scormSeqRollupRules} />
    </main>
  );
}
