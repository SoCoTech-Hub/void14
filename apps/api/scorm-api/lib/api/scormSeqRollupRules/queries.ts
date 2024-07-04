import { eq } from "drizzle-orm";

import type { ScormSeqRollupRuleId } from "../db/schema/scormSeqRollupRules";
import { db } from "../db/index";
import { scormScoes } from "../db/schema/scormScoes";
import {
  scormSeqRollupRuleIdSchema,
  scormSeqRollupRules,
} from "../db/schema/scormSeqRollupRules";

export const getScormSeqRollupRules = async () => {
  const rows = await db
    .select({ scormSeqRollupRule: scormSeqRollupRules, scormScoe: scormScoes })
    .from(scormSeqRollupRules)
    .leftJoin(scormScoes, eq(scormSeqRollupRules.scormScoeId, scormScoes.id));
  const s = rows.map((r) => ({
    ...r.scormSeqRollupRule,
    scormScoe: r.scormScoe,
  }));
  return { scormSeqRollupRules: s };
};

export const getScormSeqRollupRuleById = async (id: ScormSeqRollupRuleId) => {
  const { id: scormSeqRollupRuleId } = scormSeqRollupRuleIdSchema.parse({ id });
  const [row] = await db
    .select({ scormSeqRollupRule: scormSeqRollupRules, scormScoe: scormScoes })
    .from(scormSeqRollupRules)
    .where(eq(scormSeqRollupRules.id, scormSeqRollupRuleId))
    .leftJoin(scormScoes, eq(scormSeqRollupRules.scormScoeId, scormScoes.id));
  if (row === undefined) return {};
  const s = { ...row.scormSeqRollupRule, scormScoe: row.scormScoe };
  return { scormSeqRollupRule: s };
};
