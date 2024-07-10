import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils/nanoid";

import { lessonPages } from "./lessonPages";
import { lessons } from "./lessons";

export const lessonBranches = pgTable("lesson_branches", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  flag: integer("flag"),
  lessonId: varchar("lesson_id", { length: 256 })
    .references(() => lessons.id, { onDelete: "cascade" })
    .notNull(),
  lessonPageId: varchar("lesson_page_id", { length: 256 })
    .references(() => lessonPages.id, { onDelete: "cascade" })
    .notNull(),
  nextPageId: varchar("next_page_id", { length: 256 }),
  retry: integer("retry"),
  timeSeen: timestamp("time_seen"),
  userId: varchar("user_id", { length: 256 }).notNull(),
});

// Schema for lessonBranches - used to validate API requests
const baseSchema = createSelectSchema(lessonBranches);

export const insertLessonBranchSchema = createInsertSchema(lessonBranches);
export const insertLessonBranchParams = baseSchema
  .extend({
    flag: z.coerce.number(),
    lessonId: z.coerce.string().min(1),
    lessonPageId: z.coerce.string().min(1),
    retry: z.coerce.number(),
    timeSeen: z.coerce.string().min(1),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateLessonBranchSchema = baseSchema;
export const updateLessonBranchParams = baseSchema
  .extend({
    flag: z.coerce.number(),
    lessonId: z.coerce.string().min(1),
    lessonPageId: z.coerce.string().min(1),
    retry: z.coerce.number(),
    timeSeen: z.coerce.string().min(1),
  })
  .omit({
    userId: true,
  });
export const lessonBranchIdSchema = baseSchema.pick({ id: true });

// Types for lessonBranches - used to type API request params and within Components
export type LessonBranch = typeof lessonBranches.$inferSelect;
export type NewLessonBranch = z.infer<typeof insertLessonBranchSchema>;
export type NewLessonBranchParams = z.infer<typeof insertLessonBranchParams>;
export type UpdateLessonBranchParams = z.infer<typeof updateLessonBranchParams>;
export type LessonBranchId = z.infer<typeof lessonBranchIdSchema>["id"];
