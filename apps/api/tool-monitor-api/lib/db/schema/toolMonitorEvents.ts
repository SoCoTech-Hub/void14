import { sql } from "drizzle-orm";
import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

import { type getToolMonitorEvents } from "../api/toolMonitorEvents/queries";

export const toolMonitorEvents = pgTable("tool_monitor_events", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  contextId: varchar("context_id", { length: 256 }),
  contextInstanceId: varchar("context_instance_id", { length: 256 }),
  contextLevel: varchar("context_level", { length: 256 }),
  courseId: varchar("course_id", { length: 256 }),
  eventName: varchar("event_name", { length: 256 }),
  link: varchar("link", { length: 256 }),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for toolMonitorEvents - used to validate API requests
const baseSchema = createSelectSchema(toolMonitorEvents).omit(timestamps);

export const insertToolMonitorEventSchema =
  createInsertSchema(toolMonitorEvents).omit(timestamps);
export const insertToolMonitorEventParams = baseSchema.extend({}).omit({
  id: true,
});

export const updateToolMonitorEventSchema = baseSchema;
export const updateToolMonitorEventParams = baseSchema.extend({});
export const toolMonitorEventIdSchema = baseSchema.pick({ id: true });

// Types for toolMonitorEvents - used to type API request params and within Components
export type ToolMonitorEvent = typeof toolMonitorEvents.$inferSelect;
export type NewToolMonitorEvent = z.infer<typeof insertToolMonitorEventSchema>;
export type NewToolMonitorEventParams = z.infer<
  typeof insertToolMonitorEventParams
>;
export type UpdateToolMonitorEventParams = z.infer<
  typeof updateToolMonitorEventParams
>;
export type ToolMonitorEventId = z.infer<typeof toolMonitorEventIdSchema>["id"];

// this type infers the return from getToolMonitorEvents() - meaning it will include any joins
export type CompleteToolMonitorEvent = Awaited<
  ReturnType<typeof getToolMonitorEvents>
>["toolMonitorEvents"][number];
