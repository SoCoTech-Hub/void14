import { sql } from "drizzle-orm";
import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

import { type getMessageinboundMessagelists } from "../api/messageinboundMessagelists/queries";

export const messageinboundMessagelists = pgTable(
  "messageinbound_messagelists",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    address: text("address"),
    messageId: text("message_id"),
    userId: varchar("user_id", { length: 256 }).notNull(),

    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
  },
);

// Schema for messageinboundMessagelists - used to validate API requests
const baseSchema = createSelectSchema(messageinboundMessagelists).omit(
  timestamps,
);

export const insertMessageinboundMessagelistSchema = createInsertSchema(
  messageinboundMessagelists,
).omit(timestamps);
export const insertMessageinboundMessagelistParams = baseSchema
  .extend({})
  .omit({
    id: true,
    userId: true,
  });

export const updateMessageinboundMessagelistSchema = baseSchema;
export const updateMessageinboundMessagelistParams = baseSchema
  .extend({})
  .omit({
    userId: true,
  });
export const messageinboundMessagelistIdSchema = baseSchema.pick({ id: true });

// Types for messageinboundMessagelists - used to type API request params and within Components
export type MessageinboundMessagelist =
  typeof messageinboundMessagelists.$inferSelect;
export type NewMessageinboundMessagelist = z.infer<
  typeof insertMessageinboundMessagelistSchema
>;
export type NewMessageinboundMessagelistParams = z.infer<
  typeof insertMessageinboundMessagelistParams
>;
export type UpdateMessageinboundMessagelistParams = z.infer<
  typeof updateMessageinboundMessagelistParams
>;
export type MessageinboundMessagelistId = z.infer<
  typeof messageinboundMessagelistIdSchema
>["id"];

// this type infers the return from getMessageinboundMessagelists() - meaning it will include any joins
export type CompleteMessageinboundMessagelist = Awaited<
  ReturnType<typeof getMessageinboundMessagelists>
>["messageinboundMessagelists"][number];
