import { sql } from "drizzle-orm";
import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

import { type getEventSubscriptions } from "../../api/eventSubscriptions/queries";

export const eventSubscriptions = pgTable("event_subscriptions", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  categoryId: varchar("category_id", { length: 256 }),
  courseId: varchar("course_id", { length: 256 }),
  eventType: varchar("event_type", { length: 256 }),
  groupId: varchar("group_id", { length: 256 }),
  name: varchar("name", { length: 256 }),
  pollInterval: integer("poll_interval"),
  url: varchar("url", { length: 256 }),
  userId: varchar("user_id", { length: 256 }).notNull(),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for eventSubscriptions - used to validate API requests
const baseSchema = createSelectSchema(eventSubscriptions).omit(timestamps);

export const insertEventSubscriptionSchema =
  createInsertSchema(eventSubscriptions).omit(timestamps);
export const insertEventSubscriptionParams = baseSchema
  .extend({
    pollInterval: z.coerce.number(),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateEventSubscriptionSchema = baseSchema;
export const updateEventSubscriptionParams = baseSchema
  .extend({
    pollInterval: z.coerce.number(),
  })
  .omit({
    userId: true,
  });
export const eventSubscriptionIdSchema = baseSchema.pick({ id: true });

// Types for eventSubscriptions - used to type API request params and within Components
export type EventSubscription = typeof eventSubscriptions.$inferSelect;
export type NewEventSubscription = z.infer<
  typeof insertEventSubscriptionSchema
>;
export type NewEventSubscriptionParams = z.infer<
  typeof insertEventSubscriptionParams
>;
export type UpdateEventSubscriptionParams = z.infer<
  typeof updateEventSubscriptionParams
>;
export type EventSubscriptionId = z.infer<
  typeof eventSubscriptionIdSchema
>["id"];

// this type infers the return from getEventSubscriptions() - meaning it will include any joins
export type CompleteEventSubscription = Awaited<
  ReturnType<typeof getEventSubscriptions>
>["eventSubscriptions"][number];
