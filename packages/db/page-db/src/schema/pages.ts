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

import { nanoid } from "@soco/utils/nanoid";
import { timestamps } from "@soco/utils/timestamps";

export const pages = pgTable(
  "pages",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    content: text("content"),
    contentFormat: integer("content_format"),
    courseId: varchar("course_id", { length: 256 }),
    display: integer("display"),
    displayOptions: text("display_options"),
    intro: text("intro"),
    introFormat: integer("intro_format"),
    legacyFiles: integer("legacy_files"),
    legacyFilesLast: integer("legacy_files_last"),
    name: varchar("name", { length: 256 }),
    revision: integer("revision"),

    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
  },
  (pages) => {
    return {
      courseIdIndex: uniqueIndex("course_id_idx").on(pages.courseId),
    };
  },
);

// Schema for pages - used to validate API requests
const baseSchema = createSelectSchema(pages).omit(timestamps);

export const insertPageSchema = createInsertSchema(pages).omit(timestamps);
export const insertPageParams = baseSchema
  .extend({
    contentFormat: z.coerce.number(),
    display: z.coerce.number(),
    introFormat: z.coerce.number(),
    legacyFiles: z.coerce.number(),
    legacyFilesLast: z.coerce.number(),
    revision: z.coerce.number(),
  })
  .omit({
    id: true,
  });

export const updatePageSchema = baseSchema;
export const updatePageParams = baseSchema.extend({
  contentFormat: z.coerce.number(),
  display: z.coerce.number(),
  introFormat: z.coerce.number(),
  legacyFiles: z.coerce.number(),
  legacyFilesLast: z.coerce.number(),
  revision: z.coerce.number(),
});
export const pageIdSchema = baseSchema.pick({ id: true });

// Types for pages - used to type API request params and within Components
export type Page = typeof pages.$inferSelect;
export type NewPage = z.infer<typeof insertPageSchema>;
export type NewPageParams = z.infer<typeof insertPageParams>;
export type UpdatePageParams = z.infer<typeof updatePageParams>;
export type PageId = z.infer<typeof pageIdSchema>["id"];
