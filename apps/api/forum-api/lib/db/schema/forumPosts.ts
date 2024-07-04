import { sql } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

import { type getForumPosts } from "../../api/forumPosts/queries";

export const forumPosts = pgTable("forum_posts", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  attachment: varchar("attachment", { length: 256 }),
  charCount: integer("char_count"),
  deleted: boolean("deleted"),
  discussion: varchar("discussion", { length: 256 }),
  mailed: boolean("mailed"),
  mailNow: integer("mail_now"),
  message: text("message"),
  messageFormat: integer("message_format"),
  messageTrust: boolean("message_trust"),
  parent: integer("parent"),
  privateReplyTo: varchar("private_reply_to", { length: 256 }),
  subject: varchar("subject", { length: 256 }),
  totalScore: integer("total_score"),
  wordCount: integer("word_count"),
  userId: varchar("user_id", { length: 256 }).notNull(),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for forumPosts - used to validate API requests
const baseSchema = createSelectSchema(forumPosts).omit(timestamps);

export const insertForumPostSchema =
  createInsertSchema(forumPosts).omit(timestamps);
export const insertForumPostParams = baseSchema
  .extend({
    charCount: z.coerce.number(),
    deleted: z.coerce.boolean(),
    mailed: z.coerce.boolean(),
    mailNow: z.coerce.number(),
    messageFormat: z.coerce.number(),
    messageTrust: z.coerce.boolean(),
    parent: z.coerce.number(),
    totalScore: z.coerce.number(),
    wordCount: z.coerce.number(),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateForumPostSchema = baseSchema;
export const updateForumPostParams = baseSchema
  .extend({
    charCount: z.coerce.number(),
    deleted: z.coerce.boolean(),
    mailed: z.coerce.boolean(),
    mailNow: z.coerce.number(),
    messageFormat: z.coerce.number(),
    messageTrust: z.coerce.boolean(),
    parent: z.coerce.number(),
    totalScore: z.coerce.number(),
    wordCount: z.coerce.number(),
  })
  .omit({
    userId: true,
  });
export const forumPostIdSchema = baseSchema.pick({ id: true });

// Types for forumPosts - used to type API request params and within Components
export type ForumPost = typeof forumPosts.$inferSelect;
export type NewForumPost = z.infer<typeof insertForumPostSchema>;
export type NewForumPostParams = z.infer<typeof insertForumPostParams>;
export type UpdateForumPostParams = z.infer<typeof updateForumPostParams>;
export type ForumPostId = z.infer<typeof forumPostIdSchema>["id"];

// this type infers the return from getForumPosts() - meaning it will include any joins
export type CompleteForumPost = Awaited<
  ReturnType<typeof getForumPosts>
>["forumPosts"][number];
