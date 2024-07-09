import { boolean, pgTable, real, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { scormScoes } from "./scormScoes";

export const scormSeqObjectives = pgTable("scorm_seq_objectives", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  minNormalizedMeasure: real("min_normalized_measure"),
  objectiveId: varchar("objective_id", { length: 256 }),
  primaryObj: boolean("primary_obj"),
  satisfiedByMeasure: boolean("satisfied_by_measure"),
  scormScoeId: varchar("scorm_scoe_id", { length: 256 })
    .references(() => scormScoes.id)
    .notNull(),
});

// Schema for scormSeqObjectives - used to validate API requests
const baseSchema = createSelectSchema(scormSeqObjectives);

export const insertScormSeqObjectiveSchema =
  createInsertSchema(scormSeqObjectives);
export const insertScormSeqObjectiveParams = baseSchema
  .extend({
    minNormalizedMeasure: z.coerce.number(),
    primaryObj: z.coerce.boolean(),
    satisfiedByMeasure: z.coerce.boolean(),
    scormScoeId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
  });

export const updateScormSeqObjectiveSchema = baseSchema;
export const updateScormSeqObjectiveParams = baseSchema.extend({
  minNormalizedMeasure: z.coerce.number(),
  primaryObj: z.coerce.boolean(),
  satisfiedByMeasure: z.coerce.boolean(),
  scormScoeId: z.coerce.string().min(1),
});
export const scormSeqObjectiveIdSchema = baseSchema.pick({ id: true });

// Types for scormSeqObjectives - used to type API request params and within Components
export type ScormSeqObjective = typeof scormSeqObjectives.$inferSelect;
export type NewScormSeqObjective = z.infer<
  typeof insertScormSeqObjectiveSchema
>;
export type NewScormSeqObjectiveParams = z.infer<
  typeof insertScormSeqObjectiveParams
>;
export type UpdateScormSeqObjectiveParams = z.infer<
  typeof updateScormSeqObjectiveParams
>;
export type ScormSeqObjectiveId = z.infer<
  typeof scormSeqObjectiveIdSchema
>["id"];

