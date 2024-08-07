import { pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils/nanoid";

export const messageEmailMessages = pgTable("message_email_messages", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  conversationId: varchar("conversation_id", { length: 256 }),
  messageId: varchar("message_id", { length: 256 }),
  userId: varchar("user_id", { length: 256 }).notNull(),
});

// Schema for messageEmailMessages - used to validate API requests
const baseSchema = createSelectSchema(messageEmailMessages);

export const insertMessageEmailMessageSchema =
  createInsertSchema(messageEmailMessages);
export const insertMessageEmailMessageParams = baseSchema.extend({}).omit({
  id: true,
  userId: true,
});

export const updateMessageEmailMessageSchema = baseSchema;
export const updateMessageEmailMessageParams = baseSchema.extend({}).omit({
  userId: true,
});
export const messageEmailMessageIdSchema = baseSchema.pick({ id: true });

// Types for messageEmailMessages - used to type API request params and within Components
export type MessageEmailMessage = typeof messageEmailMessages.$inferSelect;
export type NewMessageEmailMessage = z.infer<
  typeof insertMessageEmailMessageSchema
>;
export type NewMessageEmailMessageParams = z.infer<
  typeof insertMessageEmailMessageParams
>;
export type UpdateMessageEmailMessageParams = z.infer<
  typeof updateMessageEmailMessageParams
>;
export type MessageEmailMessageId = z.infer<
  typeof messageEmailMessageIdSchema
>["id"];
