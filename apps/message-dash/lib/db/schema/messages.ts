import { sql } from "drizzle-orm";
import { varchar, text, integer, boolean, timestamp, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { type getMessages } from "@/lib/api/messages/queries";

import { nanoid, timestamps } from "@/lib/utils";


export const messages = pgTable('messages', {
  id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
  component: varchar("component", { length: 256 }),
  conversationId: varchar("conversation_id", { length: 256 }),
  contextUrl: text("context_url"),
  contextUrlName: text("context_url_name"),
  customData: text("custom_data"),
  eventType: varchar("event_type", { length: 256 }),
  fullMessage: text("full_message"),
  fullMessageFormat: integer("full_message_format"),
  fullMessageHtml: text("full_message_html"),
  notification: boolean("notification"),
  smallMessage: text("small_message"),
  subject: text("subject"),
  timeUserFromDeleted: timestamp("time_user_from_deleted"),
  timeUserToDeleted: timestamp("time_user_to_deleted"),
  userIdTo: varchar("user_id_to", { length: 256 }),
  userId: varchar("user_id", { length: 256 }).notNull(),
  
  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),

});


// Schema for messages - used to validate API requests
const baseSchema = createSelectSchema(messages).omit(timestamps)

export const insertMessageSchema = createInsertSchema(messages).omit(timestamps);
export const insertMessageParams = baseSchema.extend({
  fullMessageFormat: z.coerce.number(),
  notification: z.coerce.boolean(),
  timeUserFromDeleted: z.coerce.string().min(1),
  timeUserToDeleted: z.coerce.string().min(1)
}).omit({ 
  id: true,
  userId: true
});

export const updateMessageSchema = baseSchema;
export const updateMessageParams = baseSchema.extend({
  fullMessageFormat: z.coerce.number(),
  notification: z.coerce.boolean(),
  timeUserFromDeleted: z.coerce.string().min(1),
  timeUserToDeleted: z.coerce.string().min(1)
}).omit({ 
  userId: true
});
export const messageIdSchema = baseSchema.pick({ id: true });

// Types for messages - used to type API request params and within Components
export type Message = typeof messages.$inferSelect;
export type NewMessage = z.infer<typeof insertMessageSchema>;
export type NewMessageParams = z.infer<typeof insertMessageParams>;
export type UpdateMessageParams = z.infer<typeof updateMessageParams>;
export type MessageId = z.infer<typeof messageIdSchema>["id"];
    
// this type infers the return from getMessages() - meaning it will include any joins
export type CompleteMessage = Awaited<ReturnType<typeof getMessages>>["messages"][number];

