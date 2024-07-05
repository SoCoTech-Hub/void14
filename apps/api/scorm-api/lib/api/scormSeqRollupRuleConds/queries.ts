import { eq } from "drizzle-orm";

import type { ScormSeqRollupRuleCondId } from "../../db/schema/scormSeqRollupRuleConds";
import { db } from "../../db/index";
import { scormScoes } from "../../db/schema/scormScoes";
import {
  scormSeqRollupRuleCondIdSchema,
  scormSeqRollupRuleConds,
} from "../../db/schema/scormSeqRollupRuleConds";
import { scormSeqRollupRules } from "../../db/schema/scormSeqRollupRules";

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
