import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { scormScoes } from "./scormScoes";

export const scormSeqRuleConds = pgTable("scorm_seq_rule_conds", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  action: varchar("action", { length: 256 }),
  conditionCombination: varchar("condition_combination", { length: 256 }),
  ruletype: integer("ruletype"),
  scormScoeId: varchar("scorm_scoe_id", { length: 256 })
    .references(() => scormScoes.id)
    .notNull(),
});

// Schema for scormSeqRuleConds - used to validate API requests
const baseSchema = createSelectSchema(scormSeqRuleConds);

export const insertScormSeqRuleCondSchema =
  createInsertSchema(scormSeqRuleConds);
export const insertScormSeqRuleCondParams = baseSchema
  .extend({
    ruletype: z.coerce.number(),
    scormScoeId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
  });

export const updateScormSeqRuleCondSchema = baseSchema;
export const updateScormSeqRuleCondParams = baseSchema.extend({
  ruletype: z.coerce.number(),
  scormScoeId: z.coerce.string().min(1),
});
export const scormSeqRuleCondIdSchema = baseSchema.pick({ id: true });

// Types for scormSeqRuleConds - used to type API request params and within Components
export type ScormSeqRuleCond = typeof scormSeqRuleConds.$inferSelect;
export type NewScormSeqRuleCond = z.infer<typeof insertScormSeqRuleCondSchema>;
export type NewScormSeqRuleCondParams = z.infer<
  typeof insertScormSeqRuleCondParams
>;
export type UpdateScormSeqRuleCondParams = z.infer<
  typeof updateScormSeqRuleCondParams
>;
export type ScormSeqRuleCondId = z.infer<typeof scormSeqRuleCondIdSchema>["id"];

