import { sql } from "drizzle-orm";
import {
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

import { blogs } from "./blogs";

export const blogComments = pgTable(
  "blog_comments",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    blogId: varchar("blog_id", { length: 256 })
      .references(() => blogs.id, { onDelete: "cascade" })
      .notNull(),
    comment: text("comment").notNull(),
    parentId: varchar("parent_id", { length: 191 }),
    userId: varchar("user_id", { length: 256 }).notNull(),
    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
  },
  (blogComments) => {
    return {
      blogIdIndex: uniqueIndex("blog_id_idx").on(blogComments.blogId),
    };
  },
);

// Schema for blogComments - used to validate API requests
const baseSchema = createSelectSchema(blogComments).omit(timestamps);

export const insertBlogCommentSchema =
  createInsertSchema(blogComments).omit(timestamps);
export const insertBlogCommentParams = baseSchema
  .extend({
    blogId: z.coerce.string().min(1),
    parentId: z.coerce.number(),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateBlogCommentSchema = baseSchema;
export const updateBlogCommentParams = baseSchema
  .extend({
    blogId: z.coerce.string().min(1),
    parentId: z.coerce.number(),
  })
  .omit({
    userId: true,
  });
export const blogCommentIdSchema = baseSchema.pick({ id: true });

// Types for blogComments - used to type API request params and within Components
export type BlogComment = typeof blogComments.$inferSelect;
export type NewBlogComment = z.infer<typeof insertBlogCommentSchema>;
export type NewBlogCommentParams = z.infer<typeof insertBlogCommentParams>;
export type UpdateBlogCommentParams = z.infer<typeof updateBlogCommentParams>;
export type BlogCommentId = z.infer<typeof blogCommentIdSchema>["id"];

