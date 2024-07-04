import { sql } from "drizzle-orm";
import {
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

import { nanoid, timestamps } from "@soco/utils";

import { type getWorkshopAssessments } from "../../api/workshopAssessments/queries";

export const workshopAssessments = pgTable(
  "workshop_assessments",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    feedbackAuthor: text("feedback_author"),
    feedbackAuthorAttachment: integer("feedback_author_attachment"),
    feedbackAuthorFormat: integer("feedback_author_format"),
    feedbackReviewer: text("feedback_reviewer"),
    feedbackReviewerFormat: integer("feedback_reviewer_format"),
    grade: real("grade"),
    gradingGrade: real("grading_grade"),
    gradingGradeOver: real("grading_grade_over"),
    gradingGradeOverBy: varchar("grading_grade_over_by", { length: 256 }),
    reviewerId: varchar("reviewer_id", { length: 256 }),
    submissionId: varchar("submission_id", { length: 256 }),
    weight: integer("weight"),

    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
  },
  (workshopAssessments) => {
    return {
      reviewerIdIndex: uniqueIndex("workshop_assessments_reviewer_id_idx").on(
        workshopAssessments.reviewerId,
      ),
    };
  },
);

// Schema for workshopAssessments - used to validate API requests
const baseSchema = createSelectSchema(workshopAssessments).omit(timestamps);

export const insertWorkshopAssessmentSchema =
  createInsertSchema(workshopAssessments).omit(timestamps);
export const insertWorkshopAssessmentParams = baseSchema
  .extend({
    feedbackAuthorAttachment: z.coerce.number(),
    feedbackAuthorFormat: z.coerce.number(),
    feedbackReviewerFormat: z.coerce.number(),
    grade: z.coerce.number(),
    gradingGrade: z.coerce.number(),
    gradingGradeOver: z.coerce.number(),
    weight0: z.coerce.number(),
    weight: z.coerce.number(),
  })
  .omit({
    id: true,
  });

export const updateWorkshopAssessmentSchema = baseSchema;
export const updateWorkshopAssessmentParams = baseSchema.extend({
  feedbackAuthorAttachment: z.coerce.number(),
  feedbackAuthorFormat: z.coerce.number(),
  feedbackReviewerFormat: z.coerce.number(),
  grade: z.coerce.number(),
  gradingGrade: z.coerce.number(),
  gradingGradeOver: z.coerce.number(),
  weight0: z.coerce.number(),
  weight: z.coerce.number(),
});
export const workshopAssessmentIdSchema = baseSchema.pick({ id: true });

// Types for workshopAssessments - used to type API request params and within Components
export type WorkshopAssessment = typeof workshopAssessments.$inferSelect;
export type NewWorkshopAssessment = z.infer<
  typeof insertWorkshopAssessmentSchema
>;
export type NewWorkshopAssessmentParams = z.infer<
  typeof insertWorkshopAssessmentParams
>;
export type UpdateWorkshopAssessmentParams = z.infer<
  typeof updateWorkshopAssessmentParams
>;
export type WorkshopAssessmentId = z.infer<
  typeof workshopAssessmentIdSchema
>["id"];

// this type infers the return from getWorkshopAssessments() - meaning it will include any joins
export type CompleteWorkshopAssessment = Awaited<
  ReturnType<typeof getWorkshopAssessments>
>["workshopAssessments"][number];
