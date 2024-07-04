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

import { type getWikiVersions } from "../../api/wikiVersions/queries";
import { wikiPages } from "./wikiPages";

export const wikiVersions = pgTable(
  "wiki_versions",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    content: text("content"),
    contentFormat: integer("content_format"),
    wikiPageId: varchar("wiki_page_id", { length: 256 })
      .references(() => wikiPages.id, { onDelete: "cascade" })
      .notNull(),
    version: integer("version"),
    userId: varchar("user_id", { length: 256 }).notNull(),

    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
  },
  (wikiVersions) => {
    return {
      wikiPageIdIndex: uniqueIndex("wiki_versions_wiki_page_id_idx").on(
        wikiVersions.wikiPageId,
      ),
    };
  },
);

// Schema for wikiVersions - used to validate API requests
const baseSchema = createSelectSchema(wikiVersions).omit(timestamps);

export const insertWikiVersionSchema =
  createInsertSchema(wikiVersions).omit(timestamps);
export const insertWikiVersionParams = baseSchema
  .extend({
    contentFormat: z.coerce.number(),
    wikiPageId: z.coerce.string().min(1),
    version: z.coerce.number(),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateWikiVersionSchema = baseSchema;
export const updateWikiVersionParams = baseSchema
  .extend({
    contentFormat: z.coerce.number(),
    wikiPageId: z.coerce.string().min(1),
    version: z.coerce.number(),
  })
  .omit({
    userId: true,
  });
export const wikiVersionIdSchema = baseSchema.pick({ id: true });

// Types for wikiVersions - used to type API request params and within Components
export type WikiVersion = typeof wikiVersions.$inferSelect;
export type NewWikiVersion = z.infer<typeof insertWikiVersionSchema>;
export type NewWikiVersionParams = z.infer<typeof insertWikiVersionParams>;
export type UpdateWikiVersionParams = z.infer<typeof updateWikiVersionParams>;
export type WikiVersionId = z.infer<typeof wikiVersionIdSchema>["id"];

// this type infers the return from getWikiVersions() - meaning it will include any joins
export type CompleteWikiVersion = Awaited<
  ReturnType<typeof getWikiVersions>
>["wikiVersions"][number];
