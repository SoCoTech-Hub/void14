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

import { type getWikiPages } from "../../api/wikiPages/queries";

export const wikiPages = pgTable("wiki_pages", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  cachedContent: text("cached_content"),
  pageViews: integer("page_views"),
  readOnly: boolean("read_only"),
  subWikiId: varchar("sub_wiki_id", { length: 256 }),
  timeRendered: timestamp("time_rendered"),
  title: varchar("title", { length: 256 }),
  userId: varchar("user_id", { length: 256 }).notNull(),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for wikiPages - used to validate API requests
const baseSchema = createSelectSchema(wikiPages).omit(timestamps);

export const insertWikiPageSchema =
  createInsertSchema(wikiPages).omit(timestamps);
export const insertWikiPageParams = baseSchema
  .extend({
    pageViews: z.coerce.number(),
    readOnly: z.coerce.boolean(),
    timeRendered: z.coerce.string().min(1),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateWikiPageSchema = baseSchema;
export const updateWikiPageParams = baseSchema
  .extend({
    pageViews: z.coerce.number(),
    readOnly: z.coerce.boolean(),
    timeRendered: z.coerce.string().min(1),
  })
  .omit({
    userId: true,
  });
export const wikiPageIdSchema = baseSchema.pick({ id: true });

// Types for wikiPages - used to type API request params and within Components
export type WikiPage = typeof wikiPages.$inferSelect;
export type NewWikiPage = z.infer<typeof insertWikiPageSchema>;
export type NewWikiPageParams = z.infer<typeof insertWikiPageParams>;
export type UpdateWikiPageParams = z.infer<typeof updateWikiPageParams>;
export type WikiPageId = z.infer<typeof wikiPageIdSchema>["id"];

// this type infers the return from getWikiPages() - meaning it will include any joins
export type CompleteWikiPage = Awaited<
  ReturnType<typeof getWikiPages>
>["wikiPages"][number];
