import type { CompetencyUserCompCourseId } from "@soco/competency-db/schema/competencyUserCompCourses";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/competency-db";
import { db } from "@soco/competency-db/client";
import { competencies } from "@soco/competency-db/schema/competencies";
import {
  competencyUserCompCourseIdSchema,
  competencyUserCompCourses,
} from "@soco/competency-db/schema/competencyUserCompCourses";

export const getCompetencyUserCompCourses = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select({
      competencyUserCompCourse: competencyUserCompCourses,
      competency: competencies,
    })
    .from(competencyUserCompCourses)
    .leftJoin(
      competencies,
      eq(competencyUserCompCourses.competencyId, competencies.id),
    )
    .where(eq(competencyUserCompCourses.userId, session?.user.id!));
  const c = rows.map((r) => ({
    ...r.competencyUserCompCourse,
    competency: r.competency,
  }));
  return { competencyUserCompCourses: c };
};

export const getCompetencyUserCompCourseById = async (
  id: CompetencyUserCompCourseId,
) => {
  const { session } = await getUserAuth();
  const { id: competencyUserCompCourseId } =
    competencyUserCompCourseIdSchema.parse({ id });
  const [row] = await db
    .select({
      competencyUserCompCourse: competencyUserCompCourses,
      competency: competencies,
    })
    .from(competencyUserCompCourses)
    .where(
      and(
        eq(competencyUserCompCourses.id, competencyUserCompCourseId),
        eq(competencyUserCompCourses.userId, session?.user.id!),
      ),
    )
    .leftJoin(
      competencies,
      eq(competencyUserCompCourses.competencyId, competencies.id),
    );
  if (row === undefined) return {};
  const c = { ...row.competencyUserCompCourse, competency: row.competency };
  return { competencyUserCompCourse: c };
};
