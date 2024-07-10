import { sql } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils/nanoid";
import { timestamps } from "@soco/utils/timestamps";

export const wikis = pgTable(
  "wikis",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    courseId: varchar("course_id", { length: 256 }),
    defaultFormat: varchar("default_format", { length: 256 }),
    editBegin: integer("edit_begin"),
    editEnd: integer("edit_end"),
    firstPageTitle: varchar("first_page_title", { length: 256 }),
    forceFormat: boolean("force_format"),
    intro: text("intro"),
    introFormat: integer("intro_format"),
    name: varchar("name", { length: 256 }),
    wikiMode: varchar("wiki_mode", { length: 256 }),

    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
  },
  (wikis) => {
    return {
      courseIdIndex: uniqueIndex("course_id_idx").on(wikis.courseId),
    };
  },
);

// Schema for wikis - used to validate API requests
const baseSchema = createSelectSchema(wikis).omit(timestamps);

export const insertWikiSchema = createInsertSchema(wikis).omit(timestamps);
export const insertWikiParams = baseSchema
  .extend({
    editBegin: z.coerce.number(),
    editEnd: z.coerce.number(),
    forceFormat: z.coerce.boolean(),
    introFormat: z.coerce.number(),
  })
  .omit({
    id: true,
  });

export const updateWikiSchema = baseSchema;
export const updateWikiParams = baseSchema.extend({
  editBegin: z.coerce.number(),
  editEnd: z.coerce.number(),
  forceFormat: z.coerce.boolean(),
  introFormat: z.coerce.number(),
});
export const wikiIdSchema = baseSchema.pick({ id: true });

// Types for wikis - used to type API request params and within Components
export type Wiki = typeof wikis.$inferSelect;
export type NewWiki = z.infer<typeof insertWikiSchema>;
export type NewWikiParams = z.infer<typeof insertWikiParams>;
export type UpdateWikiParams = z.infer<typeof updateWikiParams>;
export type WikiId = z.infer<typeof wikiIdSchema>["id"];
