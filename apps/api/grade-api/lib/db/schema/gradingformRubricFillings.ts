import { integer, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { type getGradingformRubricFillings } from "../api/gradingformRubricFillings/queries";

export const gradingformRubricFillings = pgTable(
  "gradingform_rubric_fillings",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    criterionId: varchar("criterion_id", { length: 256 }),
    instanceId: varchar("instance_id", { length: 256 }),
    levelId: varchar("level_id", { length: 256 }),
    remark: text("remark"),
    remarkFormat: integer("remark_format"),
  },
);

// Schema for gradingformRubricFillings - used to validate API requests
const baseSchema = createSelectSchema(gradingformRubricFillings);

export const insertGradingformRubricFillingSchema = createInsertSchema(
  gradingformRubricFillings,
);
export const insertGradingformRubricFillingParams = baseSchema
  .extend({
    remarkFormat: z.coerce.number(),
  })
  .omit({
    id: true,
  });

export const updateGradingformRubricFillingSchema = baseSchema;
export const updateGradingformRubricFillingParams = baseSchema.extend({
  remarkFormat: z.coerce.number(),
});
export const gradingformRubricFillingIdSchema = baseSchema.pick({ id: true });

// Types for gradingformRubricFillings - used to type API request params and within Components
export type GradingformRubricFilling =
  typeof gradingformRubricFillings.$inferSelect;
export type NewGradingformRubricFilling = z.infer<
  typeof insertGradingformRubricFillingSchema
>;
export type NewGradingformRubricFillingParams = z.infer<
  typeof insertGradingformRubricFillingParams
>;
export type UpdateGradingformRubricFillingParams = z.infer<
  typeof updateGradingformRubricFillingParams
>;
export type GradingformRubricFillingId = z.infer<
  typeof gradingformRubricFillingIdSchema
>["id"];

// this type infers the return from getGradingformRubricFillings() - meaning it will include any joins
export type CompleteGradingformRubricFilling = Awaited<
  ReturnType<typeof getGradingformRubricFillings>
>["gradingformRubricFillings"][number];
