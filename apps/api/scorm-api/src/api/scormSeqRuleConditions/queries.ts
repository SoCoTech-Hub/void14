import type { ScormSeqRuleConditionId } from "@soco/scorm-db/schema/scormSeqRuleConditions";
import { eq } from "@soco/scorm-db";
import { db } from "@soco/scorm-db/client";
import { scormScoes } from "@soco/scorm-db/schema/scormScoes";
import {
  scormSeqRuleConditionIdSchema,
  scormSeqRuleConditions,
} from "@soco/scorm-db/schema/scormSeqRuleConditions";
import { scormSeqRuleConds } from "@soco/scorm-db/schema/scormSeqRuleConds";

export const getScormSeqRuleConditions = async () => {
  const rows = await db
    .select({
      scormSeqRuleCondition: scormSeqRuleConditions,
      scormSeqRuleCond: scormSeqRuleConds,
      scormScoe: scormScoes,
    })
    .from(scormSeqRuleConditions)
    .leftJoin(
      scormSeqRuleConds,
      eq(scormSeqRuleConditions.scormSeqRuleCondId, scormSeqRuleConds.id),
    )
    .leftJoin(
      scormScoes,
      eq(scormSeqRuleConditions.scormScoeId, scormScoes.id),
    );
  const s = rows.map((r) => ({
    ...r.scormSeqRuleCondition,
    scormSeqRuleCond: r.scormSeqRuleCond,
    scormScoe: r.scormScoe,
  }));
  return { scormSeqRuleConditions: s };
};

export const getScormSeqRuleConditionById = async (
  id: ScormSeqRuleConditionId,
) => {
  const { id: scormSeqRuleConditionId } = scormSeqRuleConditionIdSchema.parse({
    id,
  });
  const [row] = await db
    .select({
      scormSeqRuleCondition: scormSeqRuleConditions,
      scormSeqRuleCond: scormSeqRuleConds,
      scormScoe: scormScoes,
    })
    .from(scormSeqRuleConditions)
    .where(eq(scormSeqRuleConditions.id, scormSeqRuleConditionId))
    .leftJoin(
      scormSeqRuleConds,
      eq(scormSeqRuleConditions.scormSeqRuleCondId, scormSeqRuleConds.id),
    )
    .leftJoin(
      scormScoes,
      eq(scormSeqRuleConditions.scormScoeId, scormScoes.id),
    );
  if (row === undefined) return {};
  const s = {
    ...row.scormSeqRuleCondition,
    scormSeqRuleCond: row.scormSeqRuleCond,
    scormScoe: row.scormScoe,
  };
  return { scormSeqRuleCondition: s };
};
