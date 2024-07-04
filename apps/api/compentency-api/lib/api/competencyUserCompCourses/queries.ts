import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@soco/auth/utils";
import { type CompetencyUserCompCourseId, competencyUserCompCourseIdSchema, competencyUserCompCourses } from "@/lib/db/schema/competencyUserCompCourses";
import { competencies } from "@/lib/db/schema/competencies";

export const getCompetencyUserCompCourses = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select({ competencyUserCompCourse: competencyUserCompCourses, competency: competencies }).from(competencyUserCompCourses).leftJoin(competencies, eq(competencyUserCompCourses.competencyId, competencies.id)).where(eq(competencyUserCompCourses.userId, session?.user.id!));
  const c = rows .map((r) => ({ ...r.competencyUserCompCourse, competency: r.competency})); 
  return { competencyUserCompCourses: c };
};

export const getCompetencyUserCompCourseById = async (id: CompetencyUserCompCourseId) => {
  const { session } = await getUserAuth();
  const { id: competencyUserCompCourseId } = competencyUserCompCourseIdSchema.parse({ id });
  const [row] = await db.select({ competencyUserCompCourse: competencyUserCompCourses, competency: competencies }).from(competencyUserCompCourses).where(and(eq(competencyUserCompCourses.id, competencyUserCompCourseId), eq(competencyUserCompCourses.userId, session?.user.id!))).leftJoin(competencies, eq(competencyUserCompCourses.competencyId, competencies.id));
  if (row === undefined) return {};
  const c =  { ...row.competencyUserCompCourse, competency: row.competency } ;
  return { competencyUserCompCourse: c };
};


