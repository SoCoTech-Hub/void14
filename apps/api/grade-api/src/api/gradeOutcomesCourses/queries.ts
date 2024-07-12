import type { GradeOutcomesCourseId } from "@soco/grade-db/schema/gradeOutcomesCourses";
import { eq } from "@soco/grade-db";
import { db } from "@soco/grade-db/client";
import { gradeOutcomes } from "@soco/grade-db/schema/gradeOutcomes";
import {
  gradeOutcomesCourseIdSchema,
  gradeOutcomesCourses,
} from "@soco/grade-db/schema/gradeOutcomesCourses";

export const getGradeOutcomesCourses = async () => {
  const rows = await db
    .select({
      gradeOutcomesCourse: gradeOutcomesCourses,
      gradeOutcome: gradeOutcomes,
    })
    .from(gradeOutcomesCourses)
    .leftJoin(
      gradeOutcomes,
      eq(gradeOutcomesCourses.gradeOutcomeId, gradeOutcomes.id),
    );
  const g = rows.map((r) => ({
    ...r.gradeOutcomesCourse,
    gradeOutcome: r.gradeOutcome,
  }));
  return { gradeOutcomesCourses: g };
};

export const getGradeOutcomesCourseById = async (id: GradeOutcomesCourseId) => {
  const { id: gradeOutcomesCourseId } = gradeOutcomesCourseIdSchema.parse({
    id,
  });
  const [row] = await db
    .select({
      gradeOutcomesCourse: gradeOutcomesCourses,
      gradeOutcome: gradeOutcomes,
    })
    .from(gradeOutcomesCourses)
    .where(eq(gradeOutcomesCourses.id, gradeOutcomesCourseId))
    .leftJoin(
      gradeOutcomes,
      eq(gradeOutcomesCourses.gradeOutcomeId, gradeOutcomes.id),
    );
  if (row === undefined) return {};
  const g = { ...row.gradeOutcomesCourse, gradeOutcome: row.gradeOutcome };
  return { gradeOutcomesCourse: g };
};
