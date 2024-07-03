import ScormSeqRuleCondList from "@/components/scormSeqRuleConds/ScormSeqRuleCondList";
import NewScormSeqRuleCondModal from "@/components/scormSeqRuleConds/ScormSeqRuleCondModal";
import { api } from "@/lib/trpc/api";

export default async function ScormSeqRuleConds() {
  const { scormSeqRuleConds } = await api.scormSeqRuleConds.getScormSeqRuleConds.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Scorm Seq Rule Conds</h1>
        <NewScormSeqRuleCondModal />
      </div>
      <ScormSeqRuleCondList scormSeqRuleConds={scormSeqRuleConds} />
    </main>
  );
}
