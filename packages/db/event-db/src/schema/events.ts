import { sql } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils/nanoid";
import { timestamps } from "@soco/utils/timestamps";

export const events = pgTable("events", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  categoryId: varchar("category_id", { length: 256 }),
  component: varchar("component", { length: 256 }),
  courseId: varchar("course_id", { length: 256 }),
  description: text("description"),
  eventType: varchar("event_type", { length: 256 }),
  format: integer("format"),
  groupId: varchar("group_id", { length: 256 }),
  instance: integer("instance"),
  location: text("location"),
  moduleName: varchar("module_name", { length: 256 }),
  name: text("name"),
  priority: integer("priority"),
  repeatId: varchar("repeat_id", { length: 256 }),
  sequence: integer("sequence"),
  subscriptionId: varchar("subscription_id", { length: 256 }),
  timeSort: timestamp("time_sort"),
  timeStart: timestamp("time_start"),
  type: integer("type"),
  uuid: varchar("uuid", { length: 256 }),
  visible: boolean("visible"),
  userId: varchar("user_id", { length: 256 }).notNull(),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for events - used to validate API requests
const baseSchema = createSelectSchema(events).omit(timestamps);

export const insertEventSchema = createInsertSchema(events).omit(timestamps);
export const insertEventParams = baseSchema
  .extend({
    format: z.coerce.number(),
    instance: z.coerce.number(),
    priority: z.coerce.number(),
    sequence: z.coerce.number(),
    timeSort: z.coerce.string().min(1),
    timeStart: z.coerce.string().min(1),
    type: z.coerce.number(),
    visible: z.coerce.boolean(),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateEventSchema = baseSchema;
export const updateEventParams = baseSchema
  .extend({
    format: z.coerce.number(),
    instance: z.coerce.number(),
    priority: z.coerce.number(),
    sequence: z.coerce.number(),
    timeSort: z.coerce.string().min(1),
    timeStart: z.coerce.string().min(1),
    type: z.coerce.number(),
    visible: z.coerce.boolean(),
  })
  .omit({
    userId: true,
  });
export const eventIdSchema = baseSchema.pick({ id: true });

// Types for events - used to type API request params and within Components
export type Event = typeof events.$inferSelect;
export type NewEvent = z.infer<typeof insertEventSchema>;
export type NewEventParams = z.infer<typeof insertEventParams>;
export type UpdateEventParams = z.infer<typeof updateEventParams>;
export type EventId = z.infer<typeof eventIdSchema>["id"];
