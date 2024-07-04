import { integer, pgTable, real, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { type getGradingformRubricLevels } from "../../api/gradingformRubricLevels/queries";

export const gradingformRubricLevels = pgTable("gradingform_rubric_levels", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  criterionId: varchar("criterion_id", { length: 256 }),
  definition: text("definition"),
  definitionFormat: integer("definition_format"),
  score: real("score"),
});

// Schema for gradingformRubricLevels - used to validate API requests
const baseSchema = createSelectSchema(gradingformRubricLevels);

export const insertGradingformRubricLevelSchema = createInsertSchema(
  gradingformRubricLevels,
);
export const insertGradingformRubricLevelParams = baseSchema
  .extend({
    definitionFormat: z.coerce.number(),
    score: z.coerce.number(),
  })
  .omit({
    id: true,
  });

export const updateGradingformRubricLevelSchema = baseSchema;
export const updateGradingformRubricLevelParams = baseSchema.extend({
  definitionFormat: z.coerce.number(),
  score: z.coerce.number(),
});
export const gradingformRubricLevelIdSchema = baseSchema.pick({ id: true });

// Types for gradingformRubricLevels - used to type API request params and within Components
export type GradingformRubricLevel =
  typeof gradingformRubricLevels.$inferSelect;
export type NewGradingformRubricLevel = z.infer<
  typeof insertGradingformRubricLevelSchema
>;
export type NewGradingformRubricLevelParams = z.infer<
  typeof insertGradingformRubricLevelParams
>;
export type UpdateGradingformRubricLevelParams = z.infer<
  typeof updateGradingformRubricLevelParams
>;
export type GradingformRubricLevelId = z.infer<
  typeof gradingformRubricLevelIdSchema
>["id"];

// this type infers the return from getGradingformRubricLevels() - meaning it will include any joins
export type CompleteGradingformRubricLevel = Awaited<
  ReturnType<typeof getGradingformRubricLevels>
>["gradingformRubricLevels"][number];
