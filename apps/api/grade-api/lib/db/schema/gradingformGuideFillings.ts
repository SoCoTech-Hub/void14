import { integer, pgTable, real, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { type getGradingformGuideFillings } from "../api/gradingformGuideFillings/queries";

export const gradingformGuideFillings = pgTable("gradingform_guide_fillings", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  criterionId: varchar("criterion_id", { length: 256 }),
  instanceId: varchar("instance_id", { length: 256 }),
  remark: text("remark"),
  remarkFormat: integer("remark_format"),
  score: real("score"),
});

// Schema for gradingformGuideFillings - used to validate API requests
const baseSchema = createSelectSchema(gradingformGuideFillings);

export const insertGradingformGuideFillingSchema = createInsertSchema(
  gradingformGuideFillings,
);
export const insertGradingformGuideFillingParams = baseSchema
  .extend({
    remarkFormat: z.coerce.number(),
    score: z.coerce.number(),
  })
  .omit({
    id: true,
  });

export const updateGradingformGuideFillingSchema = baseSchema;
export const updateGradingformGuideFillingParams = baseSchema.extend({
  remarkFormat: z.coerce.number(),
  score: z.coerce.number(),
});
export const gradingformGuideFillingIdSchema = baseSchema.pick({ id: true });

// Types for gradingformGuideFillings - used to type API request params and within Components
export type GradingformGuideFilling =
  typeof gradingformGuideFillings.$inferSelect;
export type NewGradingformGuideFilling = z.infer<
  typeof insertGradingformGuideFillingSchema
>;
export type NewGradingformGuideFillingParams = z.infer<
  typeof insertGradingformGuideFillingParams
>;
export type UpdateGradingformGuideFillingParams = z.infer<
  typeof updateGradingformGuideFillingParams
>;
export type GradingformGuideFillingId = z.infer<
  typeof gradingformGuideFillingIdSchema
>["id"];

// this type infers the return from getGradingformGuideFillings() - meaning it will include any joins
export type CompleteGradingformGuideFilling = Awaited<
  ReturnType<typeof getGradingformGuideFillings>
>["gradingformGuideFillings"][number];
