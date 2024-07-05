import { eq } from "drizzle-orm";

import type { ScormSeqRuleCondId } from "../../db/schema/scormSeqRuleConds";
import { db } from "../../db/index";
import { scormScoes } from "../../db/schema/scormScoes";
import {
  scormSeqRuleCondIdSchema,
  scormSeqRuleConds,
} from "../../db/schema/scormSeqRuleConds";

export const getScormSeqRuleConds = async () => {
  const rows = await db
    .select({ scormSeqRuleCond: scormSeqRuleConds, scormScoe: scormScoes })
    .from(scormSeqRuleConds)
    .leftJoin(scormScoes, eq(scormSeqRuleConds.scormScoeId, scormScoes.id));
  const s = rows.map((r) => ({
    ...r.scormSeqRuleCond,
    scormScoe: r.scormScoe,
  }));
  return { scormSeqRuleConds: s };
};

export const getScormSeqRuleCondById = async (id: ScormSeqRuleCondId) => {
  const { id: scormSeqRuleCondId } = scormSeqRuleCondIdSchema.parse({ id });
  const [row] = await db
    .select({ scormSeqRuleCond: scormSeqRuleConds, scormScoe: scormScoes })
    .from(scormSeqRuleConds)
    .where(eq(scormSeqRuleConds.id, scormSeqRuleCondId))
    .leftJoin(scormScoes, eq(scormSeqRuleConds.scormScoeId, scormScoes.id));
  if (row === undefined) return {};
  const s = { ...row.scormSeqRuleCond, scormScoe: row.scormScoe };
  return { scormSeqRuleCond: s };
};
