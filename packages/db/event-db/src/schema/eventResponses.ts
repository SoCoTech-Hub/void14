import { sql } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

import { events } from "./events";

export const eventResponses = pgTable(
  "event_responses",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    eventId: varchar("event_id", { length: 256 })
      .references(() => events.id, { onDelete: "cascade" })
      .notNull(),
    attendance: text("attendance"),
    userId: varchar("user_id", { length: 256 }).notNull(),

    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
  },
  (eventResponses) => {
    return {
      eventIdIndex: uniqueIndex("event_id_idx").on(eventResponses.eventId),
    };
  },
);

// Schema for eventResponses - used to validate API requests
const baseSchema = createSelectSchema(eventResponses).omit(timestamps);

export const insertEventResponseSchema =
  createInsertSchema(eventResponses).omit(timestamps);
export const insertEventResponseParams = baseSchema
  .extend({
    eventId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateEventResponseSchema = baseSchema;
export const updateEventResponseParams = baseSchema
  .extend({
    eventId: z.coerce.string().min(1),
  })
  .omit({
    userId: true,
  });
export const eventResponseIdSchema = baseSchema.pick({ id: true });

// Types for eventResponses - used to type API request params and within Components
export type EventResponse = typeof eventResponses.$inferSelect;
export type NewEventResponse = z.infer<typeof insertEventResponseSchema>;
export type NewEventResponseParams = z.infer<typeof insertEventResponseParams>;
export type UpdateEventResponseParams = z.infer<
  typeof updateEventResponseParams
>;
export type EventResponseId = z.infer<typeof eventResponseIdSchema>["id"];

