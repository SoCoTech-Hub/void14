import { sql } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  real,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils/nanoid";
import { timestamps } from "@soco/utils/timestamps";

export const workshops = pgTable(
  "workshops",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    assessmentStart: integer("assessment_start"),
    conclusion: text("conclusion"),
    conclusionFormat: integer("conclusion_format"),
    courseId: varchar("course_id", { length: 256 }),
    evaluation: varchar("evaluation", { length: 256 }),
    examplesModen: integer("examples_moden"),
    grade: real("grade"),
    gradeDecimals: integer("grade_decimals"),
    gradingGrade: real("grading_grade"),
    instructAuthors: text("instruct_authors"),
    instructAuthorsFormat: integer("instruct_authors_format"),
    instructReviewers: text("instruct_reviewers"),
    instructReviewersFormat: integer("instruct_reviewers_format"),
    intro: text("intro"),
    introFormat: integer("intro_format"),
    lateSubmissions: boolean("late_submissions"),
    maxBytes: integer("max_bytes"),
    name: varchar("name", { length: 256 }),
    nattAchments: integer("natt_achments"),
    overallFeedbackFiles: integer("overall_feedback_files"),
    overallFeedbackFileTypes: varchar("overall_feedback_file_types", {
      length: 256,
    }),
    overallFeedbackMaxBytes: integer("overall_feedback_max_bytes"),
    overallFeedbackMode: integer("overall_feedback_mode"),
    phase: integer("phase"),
    phaseSwitchAssessment: boolean("phase_switch_assessment"),
    strategy: varchar("strategy", { length: 256 }),
    submissionend: integer("submissionend"),
    submissionFileTypes: varchar("submission_file_types", { length: 256 }),
    submissionStart: integer("submission_start"),
    submissionTypeFile: boolean("submission_type_file"),
    submissionTypeText: boolean("submission_type_text"),
    useExamples: boolean("use_examples"),
    usePeerAssessment: integer("use_peer_assessment"),
    useSelfAssessment: integer("use_self_assessment"),

    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
  },
  (workshops) => {
    return {
      courseIdIndex: uniqueIndex("course_id_idx").on(workshops.courseId),
    };
  },
);

// Schema for workshops - used to validate API requests
const baseSchema = createSelectSchema(workshops).omit(timestamps);

export const insertWorkshopSchema =
  createInsertSchema(workshops).omit(timestamps);
export const insertWorkshopParams = baseSchema
  .extend({
    assessmentStart: z.coerce.number(),
    conclusionFormat: z.coerce.number(),
    examplesModen: z.coerce.number(),
    grade: z.coerce.number(),
    gradeDecimals: z.coerce.number(),
    gradingGrade: z.coerce.number(),
    instructAuthorsFormat: z.coerce.number(),
    instructReviewersFormat: z.coerce.number(),
    introFormat: z.coerce.number(),
    lateSubmissions: z.coerce.boolean(),
    maxBytes: z.coerce.number(),
    nattAchments: z.coerce.number(),
    overallFeedbackFiles: z.coerce.number(),
    overallFeedbackMaxBytes: z.coerce.number(),
    overallFeedbackMode: z.coerce.number(),
    phase: z.coerce.number(),
    phaseSwitchAssessment: z.coerce.boolean(),
    submissionend: z.coerce.number(),
    submissionStart: z.coerce.number(),
    submissionTypeFile: z.coerce.boolean(),
    submissionTypeText: z.coerce.boolean(),
    useExamples: z.coerce.boolean(),
    usePeerAssessment: z.coerce.number(),
    useSelfAssessment: z.coerce.number(),
  })
  .omit({
    id: true,
  });

export const updateWorkshopSchema = baseSchema;
export const updateWorkshopParams = baseSchema.extend({
  assessmentStart: z.coerce.number(),
  conclusionFormat: z.coerce.number(),
  examplesModen: z.coerce.number(),
  grade: z.coerce.number(),
  gradeDecimals: z.coerce.number(),
  gradingGrade: z.coerce.number(),
  instructAuthorsFormat: z.coerce.number(),
  instructReviewersFormat: z.coerce.number(),
  introFormat: z.coerce.number(),
  lateSubmissions: z.coerce.boolean(),
  maxBytes: z.coerce.number(),
  nattAchments: z.coerce.number(),
  overallFeedbackFiles: z.coerce.number(),
  overallFeedbackMaxBytes: z.coerce.number(),
  overallFeedbackMode: z.coerce.number(),
  phase: z.coerce.number(),
  phaseSwitchAssessment: z.coerce.boolean(),
  submissionend: z.coerce.number(),
  submissionStart: z.coerce.number(),
  submissionTypeFile: z.coerce.boolean(),
  submissionTypeText: z.coerce.boolean(),
  useExamples: z.coerce.boolean(),
  usePeerAssessment: z.coerce.number(),
  useSelfAssessment: z.coerce.number(),
});
export const workshopIdSchema = baseSchema.pick({ id: true });

// Types for workshops - used to type API request params and within Components
export type Workshop = typeof workshops.$inferSelect;
export type NewWorkshop = z.infer<typeof insertWorkshopSchema>;
export type NewWorkshopParams = z.infer<typeof insertWorkshopParams>;
export type UpdateWorkshopParams = z.infer<typeof updateWorkshopParams>;
export type WorkshopId = z.infer<typeof workshopIdSchema>["id"];
