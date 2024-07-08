import { type getMessageConversationMembers } from "@/lib/api/messageConversationMembers/queries";
import { sql } from "drizzle-orm";
import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

export const messageConversationMembers = pgTable(
  "message_conversation_members",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    conversationId: varchar("conversation_id", { length: 256 }),
    userId: varchar("user_id", { length: 256 }).notNull(),

    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
  },
);

// Schema for messageConversationMembers - used to validate API requests
const baseSchema = createSelectSchema(messageConversationMembers).omit(
  timestamps,
);

export const insertMessageConversationMemberSchema = createInsertSchema(
  messageConversationMembers,
).omit(timestamps);
export const insertMessageConversationMemberParams = baseSchema
  .extend({})
  .omit({
    id: true,
    userId: true,
  });

export const updateMessageConversationMemberSchema = baseSchema;
export const updateMessageConversationMemberParams = baseSchema
  .extend({})
  .omit({
    userId: true,
  });
export const messageConversationMemberIdSchema = baseSchema.pick({ id: true });

// Types for messageConversationMembers - used to type API request params and within Components
export type MessageConversationMember =
  typeof messageConversationMembers.$inferSelect;
export type NewMessageConversationMember = z.infer<
  typeof insertMessageConversationMemberSchema
>;
export type NewMessageConversationMemberParams = z.infer<
  typeof insertMessageConversationMemberParams
>;
export type UpdateMessageConversationMemberParams = z.infer<
  typeof updateMessageConversationMemberParams
>;
export type MessageConversationMemberId = z.infer<
  typeof messageConversationMemberIdSchema
>["id"];

// this type infers the return from getMessageConversationMembers() - meaning it will include any joins
export type CompleteMessageConversationMember = Awaited<
  ReturnType<typeof getMessageConversationMembers>
>["messageConversationMembers"][number];
