import { type getScormSeqRollupRuleConds } from "@/lib/api/scormSeqRollupRuleConds/queries";
import { pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { scormScoes } from "./scormScoes";
import { scormSeqRollupRules } from "./scormSeqRollupRules";

export const scormSeqRollupRuleConds = pgTable("scorm_seq_rollup_rule_conds", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  cond: varchar("cond", { length: 256 }),
  operator: varchar("operator", { length: 256 }),
  scormSeqRollupRuleId: varchar("scorm_seq_rollup_rule_id", { length: 256 })
    .references(() => scormSeqRollupRules.id)
    .notNull(),
  scormScoeId: varchar("scorm_scoe_id", { length: 256 })
    .references(() => scormScoes.id)
    .notNull(),
});

// Schema for scormSeqRollupRuleConds - used to validate API requests
const baseSchema = createSelectSchema(scormSeqRollupRuleConds);

export const insertScormSeqRollupRuleCondSchema = createInsertSchema(
  scormSeqRollupRuleConds,
);
export const insertScormSeqRollupRuleCondParams = baseSchema
  .extend({
    scormSeqRollupRuleId: z.coerce.string().min(1),
    scormScoeId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
  });

export const updateScormSeqRollupRuleCondSchema = baseSchema;
export const updateScormSeqRollupRuleCondParams = baseSchema.extend({
  scormSeqRollupRuleId: z.coerce.string().min(1),
  scormScoeId: z.coerce.string().min(1),
});
export const scormSeqRollupRuleCondIdSchema = baseSchema.pick({ id: true });

// Types for scormSeqRollupRuleConds - used to type API request params and within Components
export type ScormSeqRollupRuleCond =
  typeof scormSeqRollupRuleConds.$inferSelect;
export type NewScormSeqRollupRuleCond = z.infer<
  typeof insertScormSeqRollupRuleCondSchema
>;
export type NewScormSeqRollupRuleCondParams = z.infer<
  typeof insertScormSeqRollupRuleCondParams
>;
export type UpdateScormSeqRollupRuleCondParams = z.infer<
  typeof updateScormSeqRollupRuleCondParams
>;
export type ScormSeqRollupRuleCondId = z.infer<
  typeof scormSeqRollupRuleCondIdSchema
>["id"];

// this type infers the return from getScormSeqRollupRuleConds() - meaning it will include any joins
export type CompleteScormSeqRollupRuleCond = Awaited<
  ReturnType<typeof getScormSeqRollupRuleConds>
>["scormSeqRollupRuleConds"][number];
