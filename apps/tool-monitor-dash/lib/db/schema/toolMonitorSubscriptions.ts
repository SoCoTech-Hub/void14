import { sql } from "drizzle-orm";
import { varchar, timestamp, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { toolMonitorRules } from "./toolMonitorRules"
import { type getToolMonitorSubscriptions } from "@/lib/api/toolMonitorSubscriptions/queries";

import { nanoid, timestamps } from "@/lib/utils";


export const toolMonitorSubscriptions = pgTable('tool_monitor_subscriptions', {
  id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
  cmId: varchar("cm_id", { length: 256 }),
  courseId: varchar("course_id", { length: 256 }),
  inactiveDate: timestamp("inactive_date"),
  lastNotificationSent: timestamp("last_notification_sent"),
  toolMonitorRuleId: varchar("tool_monitor_rule_id", { length: 256 }).references(() => toolMonitorRules.id, { onDelete: "cascade" }).notNull(),
  userId: varchar("user_id", { length: 256 }).notNull(),
  
  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),

});


// Schema for toolMonitorSubscriptions - used to validate API requests
const baseSchema = createSelectSchema(toolMonitorSubscriptions).omit(timestamps)

export const insertToolMonitorSubscriptionSchema = createInsertSchema(toolMonitorSubscriptions).omit(timestamps);
export const insertToolMonitorSubscriptionParams = baseSchema.extend({
  inactiveDate: z.coerce.string().min(1),
  lastNotificationSent: z.coerce.string().min(1),
  toolMonitorRuleId: z.coerce.string().min(1)
}).omit({ 
  id: true,
  userId: true
});

export const updateToolMonitorSubscriptionSchema = baseSchema;
export const updateToolMonitorSubscriptionParams = baseSchema.extend({
  inactiveDate: z.coerce.string().min(1),
  lastNotificationSent: z.coerce.string().min(1),
  toolMonitorRuleId: z.coerce.string().min(1)
}).omit({ 
  userId: true
});
export const toolMonitorSubscriptionIdSchema = baseSchema.pick({ id: true });

// Types for toolMonitorSubscriptions - used to type API request params and within Components
export type ToolMonitorSubscription = typeof toolMonitorSubscriptions.$inferSelect;
export type NewToolMonitorSubscription = z.infer<typeof insertToolMonitorSubscriptionSchema>;
export type NewToolMonitorSubscriptionParams = z.infer<typeof insertToolMonitorSubscriptionParams>;
export type UpdateToolMonitorSubscriptionParams = z.infer<typeof updateToolMonitorSubscriptionParams>;
export type ToolMonitorSubscriptionId = z.infer<typeof toolMonitorSubscriptionIdSchema>["id"];
    
// this type infers the return from getToolMonitorSubscriptions() - meaning it will include any joins
export type CompleteToolMonitorSubscription = Awaited<ReturnType<typeof getToolMonitorSubscriptions>>["toolMonitorSubscriptions"][number];

