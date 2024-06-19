import { varchar, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { type getMessageEmailMessages } from "@/lib/api/messageEmailMessages/queries";

import { nanoid } from "@/lib/utils";


export const messageEmailMessages = pgTable('message_email_messages', {
  id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
  conversationId: varchar("conversation_id", { length: 256 }),
  messageId: varchar("message_id", { length: 256 }),
  userId: varchar("user_id", { length: 256 }).notNull()
});


// Schema for messageEmailMessages - used to validate API requests
const baseSchema = createSelectSchema(messageEmailMessages)

export const insertMessageEmailMessageSchema = createInsertSchema(messageEmailMessages);
export const insertMessageEmailMessageParams = baseSchema.extend({}).omit({ 
  id: true,
  userId: true
});

export const updateMessageEmailMessageSchema = baseSchema;
export const updateMessageEmailMessageParams = baseSchema.extend({}).omit({ 
  userId: true
});
export const messageEmailMessageIdSchema = baseSchema.pick({ id: true });

// Types for messageEmailMessages - used to type API request params and within Components
export type MessageEmailMessage = typeof messageEmailMessages.$inferSelect;
export type NewMessageEmailMessage = z.infer<typeof insertMessageEmailMessageSchema>;
export type NewMessageEmailMessageParams = z.infer<typeof insertMessageEmailMessageParams>;
export type UpdateMessageEmailMessageParams = z.infer<typeof updateMessageEmailMessageParams>;
export type MessageEmailMessageId = z.infer<typeof messageEmailMessageIdSchema>["id"];
    
// this type infers the return from getMessageEmailMessages() - meaning it will include any joins
export type CompleteMessageEmailMessage = Awaited<ReturnType<typeof getMessageEmailMessages>>["messageEmailMessages"][number];

