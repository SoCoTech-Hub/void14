import { sql } from "drizzle-orm";
import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

import { type getMessageinboundDatakeys } from "../../api/messageinboundDatakeys/queries";

export const messageinboundDatakeys = pgTable("messageinbound_datakeys", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  dataKey: varchar("data_key", { length: 256 }),
  dataValue: integer("data_value"),
  expires: timestamp("expires"),
  handler: varchar("handler", { length: 256 }),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for messageinboundDatakeys - used to validate API requests
const baseSchema = createSelectSchema(messageinboundDatakeys).omit(timestamps);

export const insertMessageinboundDatakeySchema = createInsertSchema(
  messageinboundDatakeys,
).omit(timestamps);
export const insertMessageinboundDatakeyParams = baseSchema
  .extend({
    dataValue: z.coerce.number(),
    expires: z.coerce.string().min(1),
  })
  .omit({
    id: true,
  });

export const updateMessageinboundDatakeySchema = baseSchema;
export const updateMessageinboundDatakeyParams = baseSchema.extend({
  dataValue: z.coerce.number(),
  expires: z.coerce.string().min(1),
});
export const messageinboundDatakeyIdSchema = baseSchema.pick({ id: true });

// Types for messageinboundDatakeys - used to type API request params and within Components
export type MessageinboundDatakey = typeof messageinboundDatakeys.$inferSelect;
export type NewMessageinboundDatakey = z.infer<
  typeof insertMessageinboundDatakeySchema
>;
export type NewMessageinboundDatakeyParams = z.infer<
  typeof insertMessageinboundDatakeyParams
>;
export type UpdateMessageinboundDatakeyParams = z.infer<
  typeof updateMessageinboundDatakeyParams
>;
export type MessageinboundDatakeyId = z.infer<
  typeof messageinboundDatakeyIdSchema
>["id"];

// this type infers the return from getMessageinboundDatakeys() - meaning it will include any joins
export type CompleteMessageinboundDatakey = Awaited<
  ReturnType<typeof getMessageinboundDatakeys>
>["messageinboundDatakeys"][number];
