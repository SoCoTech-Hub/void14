import { sql } from "drizzle-orm";
import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils/nanoid";
import { timestamps } from "@soco/utils/timestamps";

import { toolMonitorRules } from "./toolMonitorRules";

export const toolMonitorSubscriptions = pgTable("tool_monitor_subscriptions", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  cmId: varchar("cm_id", { length: 256 }),
  courseId: varchar("course_id", { length: 256 }),
  inactiveDate: timestamp("inactive_date"),
  lastNotificationSent: timestamp("last_notification_sent"),
  toolMonitorRuleId: varchar("tool_monitor_rule_id", { length: 256 })
    .references(() => toolMonitorRules.id, { onDelete: "cascade" })
    .notNull(),
  userId: varchar("user_id", { length: 256 }).notNull(),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for toolMonitorSubscriptions - used to validate API requests
const baseSchema = createSelectSchema(toolMonitorSubscriptions).omit(
  timestamps,
);

export const insertToolMonitorSubscriptionSchema = createInsertSchema(
  toolMonitorSubscriptions,
).omit(timestamps);
export const insertToolMonitorSubscriptionParams = baseSchema
  .extend({
    inactiveDate: z.coerce.string().min(1),
    lastNotificationSent: z.coerce.string().min(1),
    toolMonitorRuleId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateToolMonitorSubscriptionSchema = baseSchema;
export const updateToolMonitorSubscriptionParams = baseSchema
  .extend({
    inactiveDate: z.coerce.string().min(1),
    lastNotificationSent: z.coerce.string().min(1),
    toolMonitorRuleId: z.coerce.string().min(1),
  })
  .omit({
    userId: true,
  });
export const toolMonitorSubscriptionIdSchema = baseSchema.pick({ id: true });

// Types for toolMonitorSubscriptions - used to type API request params and within Components
export type ToolMonitorSubscription =
  typeof toolMonitorSubscriptions.$inferSelect;
export type NewToolMonitorSubscription = z.infer<
  typeof insertToolMonitorSubscriptionSchema
>;
export type NewToolMonitorSubscriptionParams = z.infer<
  typeof insertToolMonitorSubscriptionParams
>;
export type UpdateToolMonitorSubscriptionParams = z.infer<
  typeof updateToolMonitorSubscriptionParams
>;
export type ToolMonitorSubscriptionId = z.infer<
  typeof toolMonitorSubscriptionIdSchema
>["id"];
