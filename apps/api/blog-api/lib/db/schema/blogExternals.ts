import { sql } from "drizzle-orm";
import {
  boolean,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

import { type getBlogExternals } from "../api/blogExternals/queries";

export const blogExternals = pgTable("blog_externals", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  description: text("description"),
  failedLastSync: boolean("failed_last_sync"),
  filterTags: varchar("filter_tags", { length: 256 }),
  name: varchar("name", { length: 256 }),
  url: text("url"),
  userId: varchar("user_id", { length: 256 }).notNull(),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for blogExternals - used to validate API requests
const baseSchema = createSelectSchema(blogExternals).omit(timestamps);

export const insertBlogExternalSchema =
  createInsertSchema(blogExternals).omit(timestamps);
export const insertBlogExternalParams = baseSchema
  .extend({
    failedLastSync: z.coerce.boolean(),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateBlogExternalSchema = baseSchema;
export const updateBlogExternalParams = baseSchema
  .extend({
    failedLastSync: z.coerce.boolean(),
  })
  .omit({
    userId: true,
  });
export const blogExternalIdSchema = baseSchema.pick({ id: true });

// Types for blogExternals - used to type API request params and within Components
export type BlogExternal = typeof blogExternals.$inferSelect;
export type NewBlogExternal = z.infer<typeof insertBlogExternalSchema>;
export type NewBlogExternalParams = z.infer<typeof insertBlogExternalParams>;
export type UpdateBlogExternalParams = z.infer<typeof updateBlogExternalParams>;
export type BlogExternalId = z.infer<typeof blogExternalIdSchema>["id"];

// this type infers the return from getBlogExternals() - meaning it will include any joins
export type CompleteBlogExternal = Awaited<
  ReturnType<typeof getBlogExternals>
>["blogExternals"][number];
