import ScormSeqRuleConditionList from "@/components/scormSeqRuleConditions/ScormSeqRuleConditionList";
import NewScormSeqRuleConditionModal from "@/components/scormSeqRuleConditions/ScormSeqRuleConditionModal";
import { api } from "@/lib/trpc/api";

export default async function ScormSeqRuleConditions() {
  const { scormSeqRuleConditions } = await api.scormSeqRuleConditions.getScormSeqRuleConditions.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Scorm Seq Rule Conditions</h1>
        <NewScormSeqRuleConditionModal />
      </div>
      <ScormSeqRuleConditionList scormSeqRuleConditions={scormSeqRuleConditions} />
    </main>
  );
}
