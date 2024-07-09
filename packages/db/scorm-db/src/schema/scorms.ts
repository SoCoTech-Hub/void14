import { sql } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  real,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

export const scorms = pgTable("scorms", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  auto: boolean("auto"),
  autoCommit: boolean("auto_commit"),
  completionScoreRequired: integer("completion_score_required"),
  completionStatusAllScos: boolean("completion_status_all_scos"),
  completionStatusRequired: boolean("completion_status_required"),
  courseId: varchar("course_id", { length: 256 }),
  displayAttemptStatus: boolean("display_attempt_status"),
  displayCourseStructure: boolean("display_course_structure"),
  forceCompleted: boolean("force_completed"),
  forceNewAttempt: boolean("force_new_attempt"),
  gradeMethod: integer("grade_method"),
  height: integer("height"),
  hideBrowse: boolean("hide_browse"),
  hideToc: boolean("hide_toc"),
  intro: text("intro"),
  introFormat: integer("intro_format"),
  lastAttemptLock: boolean("last_attempt_lock"),
  launch: integer("launch"),
  masteryOverride: boolean("mastery_override"),
  maxAttempt: integer("max_attempt"),
  maxGrade: real("max_grade"),
  md5Hash: varchar("md5_hash", { length: 256 }),
  name: varchar("name", { length: 256 }),
  nav: boolean("nav"),
  navPositionLeft: integer("nav_position_left"),
  navPositionTop: integer("nav_position_top"),
  options: varchar("options", { length: 256 }),
  popup: boolean("popup"),
  reference: varchar("reference", { length: 256 }),
  revision: integer("revision"),
  scormType: varchar("scorm_type", { length: 256 }),
  sha1Hash: varchar("sha1_hash", { length: 256 }),
  skipView: boolean("skip_view"),
  timeClose: timestamp("time_close"),
  timeOpen: timestamp("time_open"),
  updateFreq: boolean("update_freq"),
  version: varchar("version", { length: 256 }),
  whatGrade: integer("what_grade"),
  width: integer("width"),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for scorms - used to validate API requests
const baseSchema = createSelectSchema(scorms).omit(timestamps);

export const insertScormSchema = createInsertSchema(scorms).omit(timestamps);
export const insertScormParams = baseSchema
  .extend({
    auto: z.coerce.boolean(),
    autoCommit: z.coerce.boolean(),
    completionScoreRequired: z.coerce.number(),
    completionStatusAllScos: z.coerce.boolean(),
    completionStatusRequired: z.coerce.boolean(),
    displayAttemptStatus: z.coerce.boolean(),
    displayCourseStructure: z.coerce.boolean(),
    forceCompleted: z.coerce.boolean(),
    forceNewAttempt: z.coerce.boolean(),
    gradeMethod: z.coerce.number(),
    height: z.coerce.number(),
    hideBrowse: z.coerce.boolean(),
    hideToc: z.coerce.boolean(),
    introFormat: z.coerce.number(),
    lastAttemptLock: z.coerce.boolean(),
    launch: z.coerce.number(),
    masteryOverride: z.coerce.boolean(),
    maxAttempt: z.coerce.number(),
    maxGrade: z.coerce.number(),
    nav: z.coerce.boolean(),
    navPositionLeft: z.coerce.number(),
    navPositionTop: z.coerce.number(),
    popup: z.coerce.boolean(),
    revision: z.coerce.number(),
    skipView: z.coerce.boolean(),
    timeClose: z.coerce.string().min(1),
    timeOpen: z.coerce.string().min(1),
    updateFreq: z.coerce.boolean(),
    whatGrade: z.coerce.number(),
    width: z.coerce.number(),
  })
  .omit({
    id: true,
  });

export const updateScormSchema = baseSchema;
export const updateScormParams = baseSchema.extend({
  auto: z.coerce.boolean(),
  autoCommit: z.coerce.boolean(),
  completionScoreRequired: z.coerce.number(),
  completionStatusAllScos: z.coerce.boolean(),
  completionStatusRequired: z.coerce.boolean(),
  displayAttemptStatus: z.coerce.boolean(),
  displayCourseStructure: z.coerce.boolean(),
  forceCompleted: z.coerce.boolean(),
  forceNewAttempt: z.coerce.boolean(),
  gradeMethod: z.coerce.number(),
  height: z.coerce.number(),
  hideBrowse: z.coerce.boolean(),
  hideToc: z.coerce.boolean(),
  introFormat: z.coerce.number(),
  lastAttemptLock: z.coerce.boolean(),
  launch: z.coerce.number(),
  masteryOverride: z.coerce.boolean(),
  maxAttempt: z.coerce.number(),
  maxGrade: z.coerce.number(),
  nav: z.coerce.boolean(),
  navPositionLeft: z.coerce.number(),
  navPositionTop: z.coerce.number(),
  popup: z.coerce.boolean(),
  revision: z.coerce.number(),
  skipView: z.coerce.boolean(),
  timeClose: z.coerce.string().min(1),
  timeOpen: z.coerce.string().min(1),
  updateFreq: z.coerce.boolean(),
  whatGrade: z.coerce.number(),
  width: z.coerce.number(),
});
export const scormIdSchema = baseSchema.pick({ id: true });

// Types for scorms - used to type API request params and within Components
export type Scorm = typeof scorms.$inferSelect;
export type NewScorm = z.infer<typeof insertScormSchema>;
export type NewScormParams = z.infer<typeof insertScormParams>;
export type UpdateScormParams = z.infer<typeof updateScormParams>;
export type ScormId = z.infer<typeof scormIdSchema>["id"];


