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

import { type getChatMessagesCurrents } from "../api/chatMessagesCurrents/queries";
import { chats } from "./chats";

export const chatMessagesCurrents = pgTable(
  "chat_messages_currents",
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
  (chatMessagesCurrents) => {
    return {
      chatIdIndex: uniqueIndex("cmc_chat_id_idx").on(
        chatMessagesCurrents.chatId,
      ),
    };
  },
);

// Schema for chatMessagesCurrents - used to validate API requests
const baseSchema = createSelectSchema(chatMessagesCurrents).omit(timestamps);

export const insertChatMessagesCurrentSchema =
  createInsertSchema(chatMessagesCurrents).omit(timestamps);
export const insertChatMessagesCurrentParams = baseSchema
  .extend({
    chatId: z.coerce.string().min(1),
    isSystem: z.coerce.boolean(),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateChatMessagesCurrentSchema = baseSchema;
export const updateChatMessagesCurrentParams = baseSchema
  .extend({
    chatId: z.coerce.string().min(1),
    isSystem: z.coerce.boolean(),
  })
  .omit({
    userId: true,
  });
export const chatMessagesCurrentIdSchema = baseSchema.pick({ id: true });

// Types for chatMessagesCurrents - used to type API request params and within Components
export type ChatMessagesCurrent = typeof chatMessagesCurrents.$inferSelect;
export type NewChatMessagesCurrent = z.infer<
  typeof insertChatMessagesCurrentSchema
>;
export type NewChatMessagesCurrentParams = z.infer<
  typeof insertChatMessagesCurrentParams
>;
export type UpdateChatMessagesCurrentParams = z.infer<
  typeof updateChatMessagesCurrentParams
>;
export type ChatMessagesCurrentId = z.infer<
  typeof chatMessagesCurrentIdSchema
>["id"];

// this type infers the return from getChatMessagesCurrents() - meaning it will include any joins
export type CompleteChatMessagesCurrent = Awaited<
  ReturnType<typeof getChatMessagesCurrents>
>["chatMessagesCurrents"][number];
