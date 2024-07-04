import { sql } from "drizzle-orm";
import {
  integer,
  pgTable,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

import { type getChatUsers } from "../../api/chatUsers/queries";
import { chats } from "./chats";

export const chatUsers = pgTable(
  "chat_users",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    chatId: varchar("chat_id", { length: 256 })
      .references(() => chats.id)
      .notNull(),
    courseId: varchar("course_id", { length: 256 }),
    firstPing: integer("first_ping"),
    groupId: varchar("group_id", { length: 256 }),
    ip: varchar("ip", { length: 256 }),
    lang: varchar("lang", { length: 256 }),
    lastMessagePing: integer("last_message_ping"),
    lastPing: integer("last_ping"),
    sid: varchar("sid", { length: 256 }),
    version: varchar("version", { length: 256 }),
    userId: varchar("user_id", { length: 256 }).notNull(),

    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
  },
  (chatUsers) => {
    return {
      chatIdIndex: uniqueIndex("cu_chat_id_idx").on(chatUsers.chatId),
    };
  },
);

// Schema for chatUsers - used to validate API requests
const baseSchema = createSelectSchema(chatUsers).omit(timestamps);

export const insertChatUserSchema =
  createInsertSchema(chatUsers).omit(timestamps);
export const insertChatUserParams = baseSchema
  .extend({
    chatId: z.coerce.string().min(1),
    firstPing: z.coerce.number(),
    lastMessagePing: z.coerce.number(),
    lastPing: z.coerce.number(),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateChatUserSchema = baseSchema;
export const updateChatUserParams = baseSchema
  .extend({
    chatId: z.coerce.string().min(1),
    firstPing: z.coerce.number(),
    lastMessagePing: z.coerce.number(),
    lastPing: z.coerce.number(),
  })
  .omit({
    userId: true,
  });
export const chatUserIdSchema = baseSchema.pick({ id: true });

// Types for chatUsers - used to type API request params and within Components
export type ChatUser = typeof chatUsers.$inferSelect;
export type NewChatUser = z.infer<typeof insertChatUserSchema>;
export type NewChatUserParams = z.infer<typeof insertChatUserParams>;
export type UpdateChatUserParams = z.infer<typeof updateChatUserParams>;
export type ChatUserId = z.infer<typeof chatUserIdSchema>["id"];

// this type infers the return from getChatUsers() - meaning it will include any joins
export type CompleteChatUser = Awaited<
  ReturnType<typeof getChatUsers>
>["chatUsers"][number];
