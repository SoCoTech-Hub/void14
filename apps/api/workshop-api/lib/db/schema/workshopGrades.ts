import {
  integer,
  pgTable,
  real,
  text,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { type getWorkshopGrades } from "../../api/workshopGrades/queries";

export const workshopGrades = pgTable(
  "workshop_grades",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    assessmentId: varchar("assessment_id", { length: 256 }),
    dimensionId: varchar("dimension_id", { length: 256 }),
    grade: real("grade"),
    peerComment: text("peer_comment"),
    peerCommentFormat: integer("peer_comment_format"),
    strategy: varchar("strategy", { length: 256 }),
    userId: varchar("user_id", { length: 256 }).notNull(),
  },
  (workshopGrades) => {
    return {
      assessmentIdIndex: uniqueIndex("workshop_grades_assessment_id_idx").on(
        workshopGrades.assessmentId,
      ),
    };
  },
);

// Schema for workshopGrades - used to validate API requests
const baseSchema = createSelectSchema(workshopGrades);

export const insertWorkshopGradeSchema = createInsertSchema(workshopGrades);
export const insertWorkshopGradeParams = baseSchema
  .extend({
    grade: z.coerce.number(),
    peerCommentFormat: z.coerce.number(),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateWorkshopGradeSchema = baseSchema;
export const updateWorkshopGradeParams = baseSchema
  .extend({
    grade: z.coerce.number(),
    peerCommentFormat: z.coerce.number(),
  })
  .omit({
    userId: true,
  });
export const workshopGradeIdSchema = baseSchema.pick({ id: true });

// Types for workshopGrades - used to type API request params and within Components
export type WorkshopGrade = typeof workshopGrades.$inferSelect;
export type NewWorkshopGrade = z.infer<typeof insertWorkshopGradeSchema>;
export type NewWorkshopGradeParams = z.infer<typeof insertWorkshopGradeParams>;
export type UpdateWorkshopGradeParams = z.infer<
  typeof updateWorkshopGradeParams
>;
export type WorkshopGradeId = z.infer<typeof workshopGradeIdSchema>["id"];

// this type infers the return from getWorkshopGrades() - meaning it will include any joins
export type CompleteWorkshopGrade = Awaited<
  ReturnType<typeof getWorkshopGrades>
>["workshopGrades"][number];
