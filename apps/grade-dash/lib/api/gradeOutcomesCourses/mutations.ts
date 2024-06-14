import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  GradeOutcomesCourseId, 
  NewGradeOutcomesCourseParams,
  UpdateGradeOutcomesCourseParams, 
  updateGradeOutcomesCourseSchema,
  insertGradeOutcomesCourseSchema, 
  gradeOutcomesCourses,
  gradeOutcomesCourseIdSchema 
} from "@/lib/db/schema/gradeOutcomesCourses";

export const createGradeOutcomesCourse = async (gradeOutcomesCourse: NewGradeOutcomesCourseParams) => {
  const newGradeOutcomesCourse = insertGradeOutcomesCourseSchema.parse(gradeOutcomesCourse);
  try {
    const [g] =  await db.insert(gradeOutcomesCourses).values(newGradeOutcomesCourse).returning();
    return { gradeOutcomesCourse: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateGradeOutcomesCourse = async (id: GradeOutcomesCourseId, gradeOutcomesCourse: UpdateGradeOutcomesCourseParams) => {
  const { id: gradeOutcomesCourseId } = gradeOutcomesCourseIdSchema.parse({ id });
  const newGradeOutcomesCourse = updateGradeOutcomesCourseSchema.parse(gradeOutcomesCourse);
  try {
    const [g] =  await db
     .update(gradeOutcomesCourses)
     .set(newGradeOutcomesCourse)
     .where(eq(gradeOutcomesCourses.id, gradeOutcomesCourseId!))
     .returning();
    return { gradeOutcomesCourse: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteGradeOutcomesCourse = async (id: GradeOutcomesCourseId) => {
  const { id: gradeOutcomesCourseId } = gradeOutcomesCourseIdSchema.parse({ id });
  try {
    const [g] =  await db.delete(gradeOutcomesCourses).where(eq(gradeOutcomesCourses.id, gradeOutcomesCourseId!))
    .returning();
    return { gradeOutcomesCourse: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

