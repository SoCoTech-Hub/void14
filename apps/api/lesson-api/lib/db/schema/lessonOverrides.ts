import { type getLessonOverrides } from "@/lib/api/lessonOverrides/queries";
import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { lessons } from "./lessons";

export const lessonOverrides = pgTable("lesson_overrides", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  available: timestamp("available"),
  deadline: timestamp("deadline"),
  groupId: varchar("group_id", { length: 256 }),
  lessonId: varchar("lesson_id", { length: 256 })
    .references(() => lessons.id, { onDelete: "cascade" })
    .notNull(),
});

// Schema for lessonOverrides - used to validate API requests
const baseSchema = createSelectSchema(lessonOverrides);

export const insertLessonOverrideSchema = createInsertSchema(lessonOverrides);
export const insertLessonOverrideParams = baseSchema
  .extend({
    available: z.coerce.string().min(1),
    deadline: z.coerce.string().min(1),
    lessonId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
  });

export const updateLessonOverrideSchema = baseSchema;
export const updateLessonOverrideParams = baseSchema.extend({
  available: z.coerce.string().min(1),
  deadline: z.coerce.string().min(1),
  lessonId: z.coerce.string().min(1),
});
export const lessonOverrideIdSchema = baseSchema.pick({ id: true });

// Types for lessonOverrides - used to type API request params and within Components
export type LessonOverride = typeof lessonOverrides.$inferSelect;
export type NewLessonOverride = z.infer<typeof insertLessonOverrideSchema>;
export type NewLessonOverrideParams = z.infer<
  typeof insertLessonOverrideParams
>;
export type UpdateLessonOverrideParams = z.infer<
  typeof updateLessonOverrideParams
>;
export type LessonOverrideId = z.infer<typeof lessonOverrideIdSchema>["id"];

// this type infers the return from getLessonOverrides() - meaning it will include any joins
export type CompleteLessonOverride = Awaited<
  ReturnType<typeof getLessonOverrides>
>["lessonOverrides"][number];
