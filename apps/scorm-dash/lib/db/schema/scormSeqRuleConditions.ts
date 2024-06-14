import { varchar, real, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { scormSeqRuleConds } from "./scormSeqRuleConds"
import { scormScoes } from "./scormScoes"
import { type getScormSeqRuleConditions } from "@/lib/api/scormSeqRuleConditions/queries";

import { nanoid } from "@/lib/utils";


export const scormSeqRuleConditions = pgTable('scorm_seq_rule_conditions', {
  id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
  cond: varchar("cond", { length: 256 }),
  measureThreshold: real("measure_threshold"),
  operator: varchar("operator", { length: 256 }),
  refrencedObjective: varchar("refrenced_objective", { length: 256 }),
  scormSeqRuleCondId: varchar("scorm_seq_rule_cond_id", { length: 256 }).references(() => scormSeqRuleConds.id).notNull(),
  scormScoeId: varchar("scorm_scoe_id", { length: 256 }).references(() => scormScoes.id).notNull()
});


// Schema for scormSeqRuleConditions - used to validate API requests
const baseSchema = createSelectSchema(scormSeqRuleConditions)

export const insertScormSeqRuleConditionSchema = createInsertSchema(scormSeqRuleConditions);
export const insertScormSeqRuleConditionParams = baseSchema.extend({
  measureThreshold: z.coerce.number(),
  scormSeqRuleCondId: z.coerce.string().min(1),
  scormScoeId: z.coerce.string().min(1)
}).omit({ 
  id: true
});

export const updateScormSeqRuleConditionSchema = baseSchema;
export const updateScormSeqRuleConditionParams = baseSchema.extend({
  measureThreshold: z.coerce.number(),
  scormSeqRuleCondId: z.coerce.string().min(1),
  scormScoeId: z.coerce.string().min(1)
})
export const scormSeqRuleConditionIdSchema = baseSchema.pick({ id: true });

// Types for scormSeqRuleConditions - used to type API request params and within Components
export type ScormSeqRuleCondition = typeof scormSeqRuleConditions.$inferSelect;
export type NewScormSeqRuleCondition = z.infer<typeof insertScormSeqRuleConditionSchema>;
export type NewScormSeqRuleConditionParams = z.infer<typeof insertScormSeqRuleConditionParams>;
export type UpdateScormSeqRuleConditionParams = z.infer<typeof updateScormSeqRuleConditionParams>;
export type ScormSeqRuleConditionId = z.infer<typeof scormSeqRuleConditionIdSchema>["id"];
    
// this type infers the return from getScormSeqRuleConditions() - meaning it will include any joins
export type CompleteScormSeqRuleCondition = Awaited<ReturnType<typeof getScormSeqRuleConditions>>["scormSeqRuleConditions"][number];

