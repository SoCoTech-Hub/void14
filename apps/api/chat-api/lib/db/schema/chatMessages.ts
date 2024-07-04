import { sql } from "drizzle-orm";
import {
  boolean,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

import { type getChatMessages } from "../../api/chatMessages/queries";
import { chats } from "./chats";

export const chatMessages = pgTable(
  "chat_messages",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    chatId: varchar("chat_id", { length: 256 })
      .references(() => chats.id)
      .notNull(),
    groupId: varchar("group_id", { length: 256 }),
    isSystem: boolean("is_system"),
    message: text("message"),
    userId: varchar("user_id", { length: 256 }).notNull(),

    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
  },
  (chatMessages) => {
    return {
      chatIdIndex: uniqueIndex("cm_chat_id_idx").on(chatMessages.chatId),
    };
  },
);

// Schema for chatMessages - used to validate API requests
const baseSchema = createSelectSchema(chatMessages).omit(timestamps);

export const insertChatMessageSchema =
  createInsertSchema(chatMessages).omit(timestamps);
export const insertChatMessageParams = baseSchema
  .extend({
    chatId: z.coerce.string().min(1),
    isSystem: z.coerce.boolean(),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateChatMessageSchema = baseSchema;
export const updateChatMessageParams = baseSchema
  .extend({
    chatId: z.coerce.string().min(1),
    isSystem: z.coerce.boolean(),
  })
  .omit({
    userId: true,
  });
export const chatMessageIdSchema = baseSchema.pick({ id: true });

// Types for chatMessages - used to type API request params and within Components
export type ChatMessage = typeof chatMessages.$inferSelect;
export type NewChatMessage = z.infer<typeof insertChatMessageSchema>;
export type NewChatMessageParams = z.infer<typeof insertChatMessageParams>;
export type UpdateChatMessageParams = z.infer<typeof updateChatMessageParams>;
export type ChatMessageId = z.infer<typeof chatMessageIdSchema>["id"];

// this type infers the return from getChatMessages() - meaning it will include any joins
export type CompleteChatMessage = Awaited<
  ReturnType<typeof getChatMessages>
>["chatMessages"][number];
