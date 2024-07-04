import { integer, pgTable, real, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { type getScormSeqRollupRules } from "../../api/scormSeqRollupRules/queries";
import { scormScoes } from "./scormScoes";

export const scormSeqRollupRules = pgTable("scorm_seq_rollup_rules", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  action: varchar("action", { length: 256 }),
  childActivitySet: varchar("child_activity_set", { length: 256 }),
  conditionCombination: varchar("condition_combination", { length: 256 }),
  minimumCount: integer("minimum_count"),
  minimumPercent: real("minimum_percent"),
  scormScoeId: varchar("scorm_scoe_id", { length: 256 })
    .references(() => scormScoes.id)
    .notNull(),
});

// Schema for scormSeqRollupRules - used to validate API requests
const baseSchema = createSelectSchema(scormSeqRollupRules);

export const insertScormSeqRollupRuleSchema =
  createInsertSchema(scormSeqRollupRules);
export const insertScormSeqRollupRuleParams = baseSchema
  .extend({
    minimumCount: z.coerce.number(),
    minimumPercent: z.coerce.number(),
    scormScoeId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
  });

export const updateScormSeqRollupRuleSchema = baseSchema;
export const updateScormSeqRollupRuleParams = baseSchema.extend({
  minimumCount: z.coerce.number(),
  minimumPercent: z.coerce.number(),
  scormScoeId: z.coerce.string().min(1),
});
export const scormSeqRollupRuleIdSchema = baseSchema.pick({ id: true });

// Types for scormSeqRollupRules - used to type API request params and within Components
export type ScormSeqRollupRule = typeof scormSeqRollupRules.$inferSelect;
export type NewScormSeqRollupRule = z.infer<
  typeof insertScormSeqRollupRuleSchema
>;
export type NewScormSeqRollupRuleParams = z.infer<
  typeof insertScormSeqRollupRuleParams
>;
export type UpdateScormSeqRollupRuleParams = z.infer<
  typeof updateScormSeqRollupRuleParams
>;
export type ScormSeqRollupRuleId = z.infer<
  typeof scormSeqRollupRuleIdSchema
>["id"];

// this type infers the return from getScormSeqRollupRules() - meaning it will include any joins
export type CompleteScormSeqRollupRule = Awaited<
  ReturnType<typeof getScormSeqRollupRules>
>["scormSeqRollupRules"][number];
