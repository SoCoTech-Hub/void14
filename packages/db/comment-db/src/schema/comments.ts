import { sql } from "drizzle-orm";
import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils/nanoid";
import { timestamps } from "@soco/utils/timestamps";

export const comments = pgTable("comments", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  commentArea: varchar("comment_area", { length: 256 }),
  component: varchar("component", { length: 256 }),
  content: text("content"),
  format: varchar("format", { length: 256 }),
  contextId: varchar("context_id", { length: 256 }),
  themeId: varchar("theme_id", { length: 256 }),
  userId: varchar("user_id", { length: 256 }).notNull(),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for comments - used to validate API requests
const baseSchema = createSelectSchema(comments).omit(timestamps);

export const insertCommentSchema =
  createInsertSchema(comments).omit(timestamps);
export const insertCommentParams = baseSchema.extend({}).omit({
  id: true,
  userId: true,
});

export const updateCommentSchema = baseSchema;
export const updateCommentParams = baseSchema.extend({}).omit({
  userId: true,
});
export const commentIdSchema = baseSchema.pick({ id: true });

// Types for comments - used to type API request params and within Components
export type Comment = typeof comments.$inferSelect;
export type NewComment = z.infer<typeof insertCommentSchema>;
export type NewCommentParams = z.infer<typeof insertCommentParams>;
export type UpdateCommentParams = z.infer<typeof updateCommentParams>;
export type CommentId = z.infer<typeof commentIdSchema>["id"];
