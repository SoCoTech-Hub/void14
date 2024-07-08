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

export const books = pgTable("books", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  courseId: varchar("course_id", { length: 256 }),
  customTitles: boolean("custom_titles"),
  intro: text("intro"),
  introFormat: integer("intro_format"),
  name: varchar("name", { length: 256 }),
  navStyle: integer("nav_style"),
  numbering: integer("numbering"),
  revision: integer("revision"),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for books - used to validate API requests
const baseSchema = createSelectSchema(books).omit(timestamps);

export const insertBookSchema = createInsertSchema(books).omit(timestamps);
export const insertBookParams = baseSchema
  .extend({
    customTitles: z.coerce.boolean(),
    introFormat: z.coerce.number(),
    navStyle: z.coerce.number(),
    numbering: z.coerce.number(),
    revision: z.coerce.number(),
  })
  .omit({
    id: true,
  });

export const updateBookSchema = baseSchema;
export const updateBookParams = baseSchema.extend({
  customTitles: z.coerce.boolean(),
  introFormat: z.coerce.number(),
  navStyle: z.coerce.number(),
  numbering: z.coerce.number(),
  revision: z.coerce.number(),
});
export const bookIdSchema = baseSchema.pick({ id: true });

// Types for books - used to type API request params and within Components
export type Book = typeof books.$inferSelect;
export type NewBook = z.infer<typeof insertBookSchema>;
export type NewBookParams = z.infer<typeof insertBookParams>;
export type UpdateBookParams = z.infer<typeof updateBookParams>;
export type BookId = z.infer<typeof bookIdSchema>["id"];
