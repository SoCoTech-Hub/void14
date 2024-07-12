import { db } from "@soco/competency-db/client";
import { and, eq } from "@soco/competency-db";
import { 
  type CompetencyUserCompCourseId, 
  type NewCompetencyUserCompCourseParams,
  type UpdateCompetencyUserCompCourseParams, 
  updateCompetencyUserCompCourseSchema,
  insertCompetencyUserCompCourseSchema, 
  competencyUserCompCourses,
  competencyUserCompCourseIdSchema 
} from "@soco/competency-db/schema/competencyUserCompCourses";
import { getUserAuth } from "@soco/auth-service";

export const createCompetencyUserCompCourse = async (competencyUserCompCourse: NewCompetencyUserCompCourseParams) => {
  const { session } = await getUserAuth();
  const newCompetencyUserCompCourse = insertCompetencyUserCompCourseSchema.parse({ ...competencyUserCompCourse, userId: session?.user.id! });
  try {
    const [c] =  await db.insert(competencyUserCompCourses).values(newCompetencyUserCompCourse).returning();
    return { competencyUserCompCourse: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateCompetencyUserCompCourse = async (id: CompetencyUserCompCourseId, competencyUserCompCourse: UpdateCompetencyUserCompCourseParams) => {
  const { session } = await getUserAuth();
  const { id: competencyUserCompCourseId } = competencyUserCompCourseIdSchema.parse({ id });
  const newCompetencyUserCompCourse = updateCompetencyUserCompCourseSchema.parse({ ...competencyUserCompCourse, userId: session?.user.id! });
  try {
    const [c] =  await db
     .update(competencyUserCompCourses)
     .set({...newCompetencyUserCompCourse, updatedAt: new Date() })
     .where(and(eq(competencyUserCompCourses.id, competencyUserCompCourseId!), eq(competencyUserCompCourses.userId, session?.user.id!)))
     .returning();
    return { competencyUserCompCourse: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteCompetencyUserCompCourse = async (id: CompetencyUserCompCourseId) => {
  const { session } = await getUserAuth();
  const { id: competencyUserCompCourseId } = competencyUserCompCourseIdSchema.parse({ id });
  try {
    const [c] =  await db.delete(competencyUserCompCourses).where(and(eq(competencyUserCompCourses.id, competencyUserCompCourseId!), eq(competencyUserCompCourses.userId, session?.user.id!)))
    .returning();
    return { competencyUserCompCourse: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

