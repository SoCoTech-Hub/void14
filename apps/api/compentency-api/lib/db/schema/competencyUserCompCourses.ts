import { sql } from "drizzle-orm";
import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

import { type getCompetencyUserCompCourses } from "../api/competencyUserCompCourses/queries";
import { competencies } from "./competencies";

export const competencyUserCompCourses = pgTable(
  "competency_user_comp_courses",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    competencyId: varchar("competency_id", { length: 256 })
      .references(() => competencies.id, { onDelete: "cascade" })
      .notNull(),
    courseId: varchar("course_id", { length: 256 }),
    grade: integer("grade"),
    proficiency: integer("proficiency"),
    userModified: varchar("user_id", { length: 256 }).notNull(),
    userId: varchar("user_id", { length: 256 }).notNull(),

    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
  },
);

// Schema for competencyUserCompCourses - used to validate API requests
const baseSchema = createSelectSchema(competencyUserCompCourses).omit(
  timestamps,
);

export const insertCompetencyUserCompCourseSchema = createInsertSchema(
  competencyUserCompCourses,
).omit(timestamps);
export const insertCompetencyUserCompCourseParams = baseSchema
  .extend({
    competencyId: z.coerce.string().min(1),
    grade: z.coerce.number(),
    proficiency: z.coerce.number(),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateCompetencyUserCompCourseSchema = baseSchema;
export const updateCompetencyUserCompCourseParams = baseSchema
  .extend({
    competencyId: z.coerce.string().min(1),
    grade: z.coerce.number(),
    proficiency: z.coerce.number(),
  })
  .omit({
    userId: true,
  });
export const competencyUserCompCourseIdSchema = baseSchema.pick({ id: true });

// Types for competencyUserCompCourses - used to type API request params and within Components
export type CompetencyUserCompCourse =
  typeof competencyUserCompCourses.$inferSelect;
export type NewCompetencyUserCompCourse = z.infer<
  typeof insertCompetencyUserCompCourseSchema
>;
export type NewCompetencyUserCompCourseParams = z.infer<
  typeof insertCompetencyUserCompCourseParams
>;
export type UpdateCompetencyUserCompCourseParams = z.infer<
  typeof updateCompetencyUserCompCourseParams
>;
export type CompetencyUserCompCourseId = z.infer<
  typeof competencyUserCompCourseIdSchema
>["id"];

// this type infers the return from getCompetencyUserCompCourses() - meaning it will include any joins
export type CompleteCompetencyUserCompCourse = Awaited<
  ReturnType<typeof getCompetencyUserCompCourses>
>["competencyUserCompCourses"][number];
