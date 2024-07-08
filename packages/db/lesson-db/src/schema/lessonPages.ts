import { sql } from "drizzle-orm";
import {
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

export const lessonPages = pgTable("lesson_pages", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  contents: text("contents"),
  contentsFormat: integer("contents_format"),
  display: integer("display"),
  layout: integer("layout"),
  lessonId: varchar("lesson_id", { length: 256 }),
  nextPageId: varchar("next_page_id", { length: 256 }),
  prevPageId: varchar("prev_page_id", { length: 256 }),
  qOption: integer("q_option"),
  qType: integer("q_type"),
  title: varchar("title", { length: 256 }),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for lessonPages - used to validate API requests
const baseSchema = createSelectSchema(lessonPages).omit(timestamps);

export const insertLessonPageSchema =
  createInsertSchema(lessonPages).omit(timestamps);
export const insertLessonPageParams = baseSchema
  .extend({
    contentsFormat: z.coerce.number(),
    display: z.coerce.number(),
    layout: z.coerce.number(),
    qOption: z.coerce.number(),
    qType: z.coerce.number(),
  })
  .omit({
    id: true,
  });

export const updateLessonPageSchema = baseSchema;
export const updateLessonPageParams = baseSchema.extend({
  contentsFormat: z.coerce.number(),
  display: z.coerce.number(),
  layout: z.coerce.number(),
  qOption: z.coerce.number(),
  qType: z.coerce.number(),
});
export const lessonPageIdSchema = baseSchema.pick({ id: true });

// Types for lessonPages - used to type API request params and within Components
export type LessonPage = typeof lessonPages.$inferSelect;
export type NewLessonPage = z.infer<typeof insertLessonPageSchema>;
export type NewLessonPageParams = z.infer<typeof insertLessonPageParams>;
export type UpdateLessonPageParams = z.infer<typeof updateLessonPageParams>;
export type LessonPageId = z.infer<typeof lessonPageIdSchema>["id"];


