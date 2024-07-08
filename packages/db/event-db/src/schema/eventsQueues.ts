import { type getEventsQueues } from "@/lib/api/eventsQueues/queries";
import { sql } from "drizzle-orm";
import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

export const eventsQueues = pgTable("events_queues", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  eventData: text("event_data"),
  stackDump: text("stack_dump"),
  userId: varchar("user_id", { length: 256 }).notNull(),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for eventsQueues - used to validate API requests
const baseSchema = createSelectSchema(eventsQueues).omit(timestamps);

export const insertEventsQueueSchema =
  createInsertSchema(eventsQueues).omit(timestamps);
export const insertEventsQueueParams = baseSchema.extend({}).omit({
  id: true,
  userId: true,
});

export const updateEventsQueueSchema = baseSchema;
export const updateEventsQueueParams = baseSchema.extend({}).omit({
  userId: true,
});
export const eventsQueueIdSchema = baseSchema.pick({ id: true });

// Types for eventsQueues - used to type API request params and within Components
export type EventsQueue = typeof eventsQueues.$inferSelect;
export type NewEventsQueue = z.infer<typeof insertEventsQueueSchema>;
export type NewEventsQueueParams = z.infer<typeof insertEventsQueueParams>;
export type UpdateEventsQueueParams = z.infer<typeof updateEventsQueueParams>;
export type EventsQueueId = z.infer<typeof eventsQueueIdSchema>["id"];

// this type infers the return from getEventsQueues() - meaning it will include any joins
export type CompleteEventsQueue = Awaited<
  ReturnType<typeof getEventsQueues>
>["eventsQueues"][number];
