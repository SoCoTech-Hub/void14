import { db } from "@soco/scorm-db/index";
import { eq } from "drizzle-orm";
import { type ScormSeqRuleCondId, scormSeqRuleCondIdSchema, scormSeqRuleConds } from "@soco/scorm-db/schema/scormSeqRuleConds";
import { scormScoes } from "@soco/scorm-db/schema/scormScoes";

export const getScormSeqRuleConds = async () => {
  const rows = await db.select({ scormSeqRuleCond: scormSeqRuleConds, scormScoe: scormScoes }).from(scormSeqRuleConds).leftJoin(scormScoes, eq(scormSeqRuleConds.scormScoeId, scormScoes.id));
  const s = rows .map((r) => ({ ...r.scormSeqRuleCond, scormScoe: r.scormScoe})); 
  return { scormSeqRuleConds: s };
};

export const getScormSeqRuleCondById = async (id: ScormSeqRuleCondId) => {
  const { id: scormSeqRuleCondId } = scormSeqRuleCondIdSchema.parse({ id });
  const [row] = await db.select({ scormSeqRuleCond: scormSeqRuleConds, scormScoe: scormScoes }).from(scormSeqRuleConds).where(eq(scormSeqRuleConds.id, scormSeqRuleCondId)).leftJoin(scormScoes, eq(scormSeqRuleConds.scormScoeId, scormScoes.id));
  if (row === undefined) return {};
  const s =  { ...row.scormSeqRuleCond, scormScoe: row.scormScoe } ;
  return { scormSeqRuleCond: s };
};


