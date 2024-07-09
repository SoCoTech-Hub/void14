import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth-services";
import { db } from "@soco/grade-db/index";
import {
  gradeOutcomesHistories,
  GradeOutcomesHistoryId,
  gradeOutcomesHistoryIdSchema,
  insertGradeOutcomesHistorySchema,
  NewGradeOutcomesHistoryParams,
  UpdateGradeOutcomesHistoryParams,
  updateGradeOutcomesHistorySchema,
} from "@soco/grade-db/schema/gradeOutcomesHistories";

export const createGradeOutcomesHistory = async (
  gradeOutcomesHistory: NewGradeOutcomesHistoryParams,
) => {
  const { session } = await getUserAuth();
  const newGradeOutcomesHistory = insertGradeOutcomesHistorySchema.parse({
    ...gradeOutcomesHistory,
    userId: session?.user.id!,
  });
  try {
    const [g] = await db
      .insert(gradeOutcomesHistories)
      .values(newGradeOutcomesHistory)
      .returning();
    return { gradeOutcomesHistory: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateGradeOutcomesHistory = async (
  id: GradeOutcomesHistoryId,
  gradeOutcomesHistory: UpdateGradeOutcomesHistoryParams,
) => {
  const { session } = await getUserAuth();
  const { id: gradeOutcomesHistoryId } = gradeOutcomesHistoryIdSchema.parse({
    id,
  });
  const newGradeOutcomesHistory = updateGradeOutcomesHistorySchema.parse({
    ...gradeOutcomesHistory,
    userId: session?.user.id!,
  });
  try {
    const [g] = await db
      .update(gradeOutcomesHistories)
      .set({ ...newGradeOutcomesHistory, updatedAt: new Date() })
      .where(
        and(
          eq(gradeOutcomesHistories.id, gradeOutcomesHistoryId!),
          eq(gradeOutcomesHistories.userId, session?.user.id!),
        ),
      )
      .returning();
    return { gradeOutcomesHistory: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteGradeOutcomesHistory = async (
  id: GradeOutcomesHistoryId,
) => {
  const { session } = await getUserAuth();
  const { id: gradeOutcomesHistoryId } = gradeOutcomesHistoryIdSchema.parse({
    id,
  });
  try {
    const [g] = await db
      .delete(gradeOutcomesHistories)
      .where(
        and(
          eq(gradeOutcomesHistories.id, gradeOutcomesHistoryId!),
          eq(gradeOutcomesHistories.userId, session?.user.id!),
        ),
      )
      .returning();
    return { gradeOutcomesHistory: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
