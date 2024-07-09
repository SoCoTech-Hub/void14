import { boolean, integer, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

export const toolUserToursTours = pgTable("tool_user_tours_tours", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  configData: text("config_data"),
  description: text("description"),
  displayStepNumbers: boolean("display_step_numbers"),
  enabled: boolean("enabled"),
  endTourLabel: varchar("end_tour_label", { length: 256 }),
  name: varchar("name", { length: 256 }),
  pathMatch: varchar("path_match", { length: 256 }),
  sortOrder: integer("sort_order"),
});

// Schema for toolUserToursTours - used to validate API requests
const baseSchema = createSelectSchema(toolUserToursTours);

export const insertToolUserToursTourSchema =
  createInsertSchema(toolUserToursTours);
export const insertToolUserToursTourParams = baseSchema
  .extend({
    displayStepNumbers: z.coerce.boolean(),
    enabled: z.coerce.boolean(),
    sortOrder: z.coerce.number(),
  })
  .omit({
    id: true,
  });

export const updateToolUserToursTourSchema = baseSchema;
export const updateToolUserToursTourParams = baseSchema.extend({
  displayStepNumbers: z.coerce.boolean(),
  enabled: z.coerce.boolean(),
  sortOrder: z.coerce.number(),
});
export const toolUserToursTourIdSchema = baseSchema.pick({ id: true });

// Types for toolUserToursTours - used to type API request params and within Components
export type ToolUserToursTour = typeof toolUserToursTours.$inferSelect;
export type NewToolUserToursTour = z.infer<
  typeof insertToolUserToursTourSchema
>;
export type NewToolUserToursTourParams = z.infer<
  typeof insertToolUserToursTourParams
>;
export type UpdateToolUserToursTourParams = z.infer<
  typeof updateToolUserToursTourParams
>;
export type ToolUserToursTourId = z.infer<
  typeof toolUserToursTourIdSchema
>["id"];

