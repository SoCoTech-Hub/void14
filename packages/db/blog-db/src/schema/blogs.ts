import type { z } from "zod";
import { sql } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import { nanoid } from "@soco/utils/nanoid";
import { timestamps } from "@soco/utils/timestamps";

export const blogs = pgTable(
  "blogs",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    name: varchar("name", { length: 256 }).notNull(),
    content: text("content").notNull(),
    description: varchar("description", { length: 256 }).notNull(),
    featureImage: varchar("feature_image", { length: 256 }),

    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
  },
  (blogs) => {
    return {
      nameIndex: uniqueIndex("name_idx").on(blogs.name),
    };
  },
);

// Schema for blogs - used to validate API requests
const baseSchema = createSelectSchema(blogs).omit(timestamps);

export const insertBlogSchema = createInsertSchema(blogs).omit(timestamps);
export const insertBlogParams = baseSchema.extend({}).omit({
  id: true,
});

export const updateBlogSchema = baseSchema;
export const updateBlogParams = baseSchema.extend({});
export const blogIdSchema = baseSchema.pick({ id: true });

// Types for blogs - used to type API request params and within Components
export type Blog = typeof blogs.$inferSelect;
export type NewBlog = z.infer<typeof insertBlogSchema>;
export type NewBlogParams = z.infer<typeof insertBlogParams>;
export type UpdateBlogParams = z.infer<typeof updateBlogParams>;
export type BlogId = z.infer<typeof blogIdSchema>["id"];
