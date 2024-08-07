import type {
  GradeGradesHistoryId,
  NewGradeGradesHistoryParams,
  UpdateGradeGradesHistoryParams,
} from "@soco/grade-db/schema/gradeGradesHistories";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/grade-db";
import { db } from "@soco/grade-db/client";
import {
  gradeGradesHistories,
  gradeGradesHistoryIdSchema,
  insertGradeGradesHistorySchema,
  updateGradeGradesHistorySchema,
} from "@soco/grade-db/schema/gradeGradesHistories";

export const createGradeGradesHistory = async (
  gradeGradesHistory: NewGradeGradesHistoryParams,
) => {
  const { session } = await getUserAuth();
  const newGradeGradesHistory = insertGradeGradesHistorySchema.parse({
    ...gradeGradesHistory,
    userId: session?.user.id!,
  });
  try {
    const [g] = await db
      .insert(gradeGradesHistories)
      .values(newGradeGradesHistory)
      .returning();
    return { gradeGradesHistory: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateGradeGradesHistory = async (
  id: GradeGradesHistoryId,
  gradeGradesHistory: UpdateGradeGradesHistoryParams,
) => {
  const { session } = await getUserAuth();
  const { id: gradeGradesHistoryId } = gradeGradesHistoryIdSchema.parse({ id });
  const newGradeGradesHistory = updateGradeGradesHistorySchema.parse({
    ...gradeGradesHistory,
    userId: session?.user.id!,
  });
  try {
    const [g] = await db
      .update(gradeGradesHistories)
      .set({ ...newGradeGradesHistory, updatedAt: new Date() })
      .where(
        and(
          eq(gradeGradesHistories.id, gradeGradesHistoryId!),
          eq(gradeGradesHistories.userId, session?.user.id!),
        ),
      )
      .returning();
    return { gradeGradesHistory: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteGradeGradesHistory = async (id: GradeGradesHistoryId) => {
  const { session } = await getUserAuth();
  const { id: gradeGradesHistoryId } = gradeGradesHistoryIdSchema.parse({ id });
  try {
    const [g] = await db
      .delete(gradeGradesHistories)
      .where(
        and(
          eq(gradeGradesHistories.id, gradeGradesHistoryId!),
          eq(gradeGradesHistories.userId, session?.user.id!),
        ),
      )
      .returning();
    return { gradeGradesHistory: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
