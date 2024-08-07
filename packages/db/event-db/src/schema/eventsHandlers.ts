import { boolean, integer, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils/nanoid";

export const eventsHandlers = pgTable("events_handlers", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  component: varchar("component", { length: 256 }),
  eventName: varchar("event_name", { length: 256 }),
  handlerFile: varchar("handler_file", { length: 256 }),
  handlerFunction: text("handler_function"),
  internal: boolean("internal"),
  schedule: varchar("schedule", { length: 256 }),
  status: integer("status"),
});

// Schema for eventsHandlers - used to validate API requests
const baseSchema = createSelectSchema(eventsHandlers);

export const insertEventsHandlerSchema = createInsertSchema(eventsHandlers);
export const insertEventsHandlerParams = baseSchema
  .extend({
    internal: z.coerce.boolean(),
    status: z.coerce.number(),
  })
  .omit({
    id: true,
  });

export const updateEventsHandlerSchema = baseSchema;
export const updateEventsHandlerParams = baseSchema.extend({
  internal: z.coerce.boolean(),
  status: z.coerce.number(),
});
export const eventsHandlerIdSchema = baseSchema.pick({ id: true });

// Types for eventsHandlers - used to type API request params and within Components
export type EventsHandler = typeof eventsHandlers.$inferSelect;
export type NewEventsHandler = z.infer<typeof insertEventsHandlerSchema>;
export type NewEventsHandlerParams = z.infer<typeof insertEventsHandlerParams>;
export type UpdateEventsHandlerParams = z.infer<
  typeof updateEventsHandlerParams
>;
export type EventsHandlerId = z.infer<typeof eventsHandlerIdSchema>["id"];
