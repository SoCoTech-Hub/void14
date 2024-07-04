import { integer, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { type getToolUserToursSteps } from "../api/toolUserToursSteps/queries";

export const toolUserToursSteps = pgTable("tool_user_tours_steps", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  configData: text("config_data"),
  content: text("content"),
  contentFormat: integer("content_format"),
  sortOrder: integer("sort_order"),
  targetType: integer("target_type"),
  targetValue: text("target_value"),
  title: varchar("title", { length: 256 }),
  tourId: varchar("tour_id", { length: 256 }),
});

// Schema for toolUserToursSteps - used to validate API requests
const baseSchema = createSelectSchema(toolUserToursSteps);

export const insertToolUserToursStepSchema =
  createInsertSchema(toolUserToursSteps);
export const insertToolUserToursStepParams = baseSchema
  .extend({
    contentFormat: z.coerce.number(),
    sortOrder: z.coerce.number(),
    targetType: z.coerce.number(),
  })
  .omit({
    id: true,
  });

export const updateToolUserToursStepSchema = baseSchema;
export const updateToolUserToursStepParams = baseSchema.extend({
  contentFormat: z.coerce.number(),
  sortOrder: z.coerce.number(),
  targetType: z.coerce.number(),
});
export const toolUserToursStepIdSchema = baseSchema.pick({ id: true });

// Types for toolUserToursSteps - used to type API request params and within Components
export type ToolUserToursStep = typeof toolUserToursSteps.$inferSelect;
export type NewToolUserToursStep = z.infer<
  typeof insertToolUserToursStepSchema
>;
export type NewToolUserToursStepParams = z.infer<
  typeof insertToolUserToursStepParams
>;
export type UpdateToolUserToursStepParams = z.infer<
  typeof updateToolUserToursStepParams
>;
export type ToolUserToursStepId = z.infer<
  typeof toolUserToursStepIdSchema
>["id"];

// this type infers the return from getToolUserToursSteps() - meaning it will include any joins
export type CompleteToolUserToursStep = Awaited<
  ReturnType<typeof getToolUserToursSteps>
>["toolUserToursSteps"][number];
