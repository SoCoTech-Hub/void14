import type { ScormSeqRollupRuleCondId } from "@soco/scorm-db/schema/scormSeqRollupRuleConds";
import { eq } from "@soco/scorm-db";
import { db } from "@soco/scorm-db/client";
import { scormScoes } from "@soco/scorm-db/schema/scormScoes";
import {
  scormSeqRollupRuleCondIdSchema,
  scormSeqRollupRuleConds,
} from "@soco/scorm-db/schema/scormSeqRollupRuleConds";
import { scormSeqRollupRules } from "@soco/scorm-db/schema/scormSeqRollupRules";

export const getScormSeqRollupRuleConds = async () => {
  const rows = await db
    .select({
      scormSeqRollupRuleCond: scormSeqRollupRuleConds,
      scormSeqRollupRule: scormSeqRollupRules,
      scormScoe: scormScoes,
    })
    .from(scormSeqRollupRuleConds)
    .leftJoin(
      scormSeqRollupRules,
      eq(scormSeqRollupRuleConds.scormSeqRollupRuleId, scormSeqRollupRules.id),
    )
    .leftJoin(
      scormScoes,
      eq(scormSeqRollupRuleConds.scormScoeId, scormScoes.id),
    );
  const s = rows.map((r) => ({
    ...r.scormSeqRollupRuleCond,
    scormSeqRollupRule: r.scormSeqRollupRule,
    scormScoe: r.scormScoe,
  }));
  return { scormSeqRollupRuleConds: s };
};

export const getScormSeqRollupRuleCondById = async (
  id: ScormSeqRollupRuleCondId,
) => {
  const { id: scormSeqRollupRuleCondId } = scormSeqRollupRuleCondIdSchema.parse(
    { id },
  );
  const [row] = await db
    .select({
      scormSeqRollupRuleCond: scormSeqRollupRuleConds,
      scormSeqRollupRule: scormSeqRollupRules,
      scormScoe: scormScoes,
    })
    .from(scormSeqRollupRuleConds)
    .where(eq(scormSeqRollupRuleConds.id, scormSeqRollupRuleCondId))
    .leftJoin(
      scormSeqRollupRules,
      eq(scormSeqRollupRuleConds.scormSeqRollupRuleId, scormSeqRollupRules.id),
    )
    .leftJoin(
      scormScoes,
      eq(scormSeqRollupRuleConds.scormScoeId, scormScoes.id),
    );
  if (row === undefined) return {};
  const s = {
    ...row.scormSeqRollupRuleCond,
    scormSeqRollupRule: row.scormSeqRollupRule,
    scormScoe: row.scormScoe,
  };
  return { scormSeqRollupRuleCond: s };
};
