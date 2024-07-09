import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth-services";
import { db } from "@soco/grade-db/index";
import {
  GradeGradeId,
  gradeGradeIdSchema,
  gradeGrades,
  insertGradeGradeSchema,
  NewGradeGradeParams,
  UpdateGradeGradeParams,
  updateGradeGradeSchema,
} from "@soco/grade-db/schema/gradeGrades";

export const createGradeGrade = async (gradeGrade: NewGradeGradeParams) => {
  const { session } = await getUserAuth();
  const newGradeGrade = insertGradeGradeSchema.parse({
    ...gradeGrade,
    userId: session?.user.id!,
  });
  try {
    const [g] = await db.insert(gradeGrades).values(newGradeGrade).returning();
    return { gradeGrade: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateGradeGrade = async (
  id: GradeGradeId,
  gradeGrade: UpdateGradeGradeParams,
) => {
  const { session } = await getUserAuth();
  const { id: gradeGradeId } = gradeGradeIdSchema.parse({ id });
  const newGradeGrade = updateGradeGradeSchema.parse({
    ...gradeGrade,
    userId: session?.user.id!,
  });
  try {
    const [g] = await db
      .update(gradeGrades)
      .set({ ...newGradeGrade, updatedAt: new Date() })
      .where(
        and(
          eq(gradeGrades.id, gradeGradeId!),
          eq(gradeGrades.userId, session?.user.id!),
        ),
      )
      .returning();
    return { gradeGrade: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteGradeGrade = async (id: GradeGradeId) => {
  const { session } = await getUserAuth();
  const { id: gradeGradeId } = gradeGradeIdSchema.parse({ id });
  try {
    const [g] = await db
      .delete(gradeGrades)
      .where(
        and(
          eq(gradeGrades.id, gradeGradeId!),
          eq(gradeGrades.userId, session?.user.id!),
        ),
      )
      .returning();
    return { gradeGrade: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
