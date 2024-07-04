import type { getBookChapters } from "@/lib/api/bookChapters/queries";
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

import { nanoid, timestamps } from "@soco/utils";

import { books } from "./books";

export const bookChapters = pgTable(
  "book_chapters",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    bookId: varchar("book_id", { length: 256 })
      .references(() => books.id, { onDelete: "cascade" })
      .notNull(),
    content: text("content"),
    contentFormat: integer("content_format"),
    hidden: boolean("hidden"),
    importSrc: varchar("import_src", { length: 256 }),
    pageNum: integer("page_num"),
    subChapter: varchar("sub_chapter", { length: 256 }),
    title: varchar("title", { length: 256 }),

    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
  },
  (bookChapters) => {
    return {
      bookIdIndex: uniqueIndex("book_id_idx").on(bookChapters.bookId),
    };
  },
);

// Schema for bookChapters - used to validate API requests
const baseSchema = createSelectSchema(bookChapters).omit(timestamps);

export const insertBookChapterSchema =
  createInsertSchema(bookChapters).omit(timestamps);
export const insertBookChapterParams = baseSchema
  .extend({
    bookId: z.coerce.string().min(1),
    contentFormat: z.coerce.number(),
    hidden: z.coerce.boolean(),
    pageNum: z.coerce.number(),
  })
  .omit({
    id: true,
  });

export const updateBookChapterSchema = baseSchema;
export const updateBookChapterParams = baseSchema.extend({
  bookId: z.coerce.string().min(1),
  contentFormat: z.coerce.number(),
  hidden: z.coerce.boolean(),
  pageNum: z.coerce.number(),
});
export const bookChapterIdSchema = baseSchema.pick({ id: true });

// Types for bookChapters - used to type API request params and within Components
export type BookChapter = typeof bookChapters.$inferSelect;
export type NewBookChapter = z.infer<typeof insertBookChapterSchema>;
export type NewBookChapterParams = z.infer<typeof insertBookChapterParams>;
export type UpdateBookChapterParams = z.infer<typeof updateBookChapterParams>;
export type BookChapterId = z.infer<typeof bookChapterIdSchema>["id"];

// this type infers the return from getBookChapters() - meaning it will include any joins
export type CompleteBookChapter = Awaited<
  ReturnType<typeof getBookChapters>
>["bookChapters"][number];
