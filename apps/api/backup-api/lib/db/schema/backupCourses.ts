import { sql } from "drizzle-orm";
import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

import { type getBackupCourses } from "../../api/backupCourses/queries";

export const backupCourses = pgTable("backup_courses", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  courseId: varchar("course_id", { length: 256 }),
  lastStatus: varchar("last_status", { length: 256 }),
  lastStartTime: timestamp("last_start_time"),
  lastEndTime: timestamp("last_end_time"),
  nextStartTime: timestamp("next_start_time"),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for backupCourses - used to validate API requests
const baseSchema = createSelectSchema(backupCourses).omit(timestamps);

export const insertBackupCourseSchema =
  createInsertSchema(backupCourses).omit(timestamps);
export const insertBackupCourseParams = baseSchema
  .extend({
    lastStartTime: z.coerce.string().min(1),
    lastEndTime: z.coerce.string().min(1),
    nextStartTime: z.coerce.string().min(1),
  })
  .omit({
    id: true,
  });

export const updateBackupCourseSchema = baseSchema;
export const updateBackupCourseParams = baseSchema.extend({
  lastStartTime: z.coerce.string().min(1),
  lastEndTime: z.coerce.string().min(1),
  nextStartTime: z.coerce.string().min(1),
});
export const backupCourseIdSchema = baseSchema.pick({ id: true });

// Types for backupCourses - used to type API request params and within Components
export type BackupCourse = typeof backupCourses.$inferSelect;
export type NewBackupCourse = z.infer<typeof insertBackupCourseSchema>;
export type NewBackupCourseParams = z.infer<typeof insertBackupCourseParams>;
export type UpdateBackupCourseParams = z.infer<typeof updateBackupCourseParams>;
export type BackupCourseId = z.infer<typeof backupCourseIdSchema>["id"];

// this type infers the return from getBackupCourses() - meaning it will include any joins
export type CompleteBackupCourse = Awaited<
  ReturnType<typeof getBackupCourses>
>["backupCourses"][number];
