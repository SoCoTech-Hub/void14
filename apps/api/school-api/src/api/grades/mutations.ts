import type {
  GradeId,
  NewGradeParams,
  UpdateGradeParams,
} from "@soco/school-db/schema/grades";
import { eq } from "@soco/school-db";
import { db } from "@soco/school-db/client";
import {
  gradeIdSchema,
  grades,
  insertGradeSchema,
  updateGradeSchema,
} from "@soco/school-db/schema/grades";

export const createGrade = async (grade: NewGradeParams) => {
  const newGrade = insertGradeSchema.parse(grade);
  try {
    const [g] = await db.insert(grades).values(newGrade).returning();
    return { grade: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateGrade = async (id: GradeId, grade: UpdateGradeParams) => {
  const { id: gradeId } = gradeIdSchema.parse({ id });
  const newGrade = updateGradeSchema.parse(grade);
  try {
    const [g] = await db
      .update(grades)
      .set(newGrade)
      .where(eq(grades.id, gradeId!))
      .returning();
    return { grade: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteGrade = async (id: GradeId) => {
  const { id: gradeId } = gradeIdSchema.parse({ id });
  try {
    const [g] = await db
      .delete(grades)
      .where(eq(grades.id, gradeId!))
      .returning();
    return { grade: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
