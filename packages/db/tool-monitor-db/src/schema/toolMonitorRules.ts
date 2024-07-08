import { type getToolMonitorRules } from "@/lib/api/toolMonitorRules/queries";
import { sql } from "drizzle-orm";
import {
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

export const toolMonitorRules = pgTable("tool_monitor_rules", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  courseId: varchar("course_id", { length: 256 }),
  description: text("description"),
  descriptionFormat: integer("description_format"),
  eventName: varchar("event_name", { length: 256 }),
  frequency: integer("frequency"),
  name: varchar("name", { length: 256 }),
  plugin: varchar("plugin", { length: 256 }),
  template: text("template"),
  templateFormat: integer("template_format"),
  timeWindow: integer("time_window"),
  userId: varchar("user_id", { length: 256 }).notNull(),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for toolMonitorRules - used to validate API requests
const baseSchema = createSelectSchema(toolMonitorRules).omit(timestamps);

export const insertToolMonitorRuleSchema =
  createInsertSchema(toolMonitorRules).omit(timestamps);
export const insertToolMonitorRuleParams = baseSchema
  .extend({
    descriptionFormat: z.coerce.number(),
    frequency: z.coerce.number(),
    templateFormat: z.coerce.number(),
    timeWindow: z.coerce.number(),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateToolMonitorRuleSchema = baseSchema;
export const updateToolMonitorRuleParams = baseSchema
  .extend({
    descriptionFormat: z.coerce.number(),
    frequency: z.coerce.number(),
    templateFormat: z.coerce.number(),
    timeWindow: z.coerce.number(),
  })
  .omit({
    userId: true,
  });
export const toolMonitorRuleIdSchema = baseSchema.pick({ id: true });

// Types for toolMonitorRules - used to type API request params and within Components
export type ToolMonitorRule = typeof toolMonitorRules.$inferSelect;
export type NewToolMonitorRule = z.infer<typeof insertToolMonitorRuleSchema>;
export type NewToolMonitorRuleParams = z.infer<
  typeof insertToolMonitorRuleParams
>;
export type UpdateToolMonitorRuleParams = z.infer<
  typeof updateToolMonitorRuleParams
>;
export type ToolMonitorRuleId = z.infer<typeof toolMonitorRuleIdSchema>["id"];

// this type infers the return from getToolMonitorRules() - meaning it will include any joins
export type CompleteToolMonitorRule = Awaited<
  ReturnType<typeof getToolMonitorRules>
>["toolMonitorRules"][number];
