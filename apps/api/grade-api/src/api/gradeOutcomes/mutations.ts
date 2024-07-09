import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth-services";
import { db } from "@soco/grade-db/index";
import {
  GradeOutcomeId,
  gradeOutcomeIdSchema,
  gradeOutcomes,
  insertGradeOutcomeSchema,
  NewGradeOutcomeParams,
  UpdateGradeOutcomeParams,
  updateGradeOutcomeSchema,
} from "@soco/grade-db/schema/gradeOutcomes";

export const createGradeOutcome = async (
  gradeOutcome: NewGradeOutcomeParams,
) => {
  const { session } = await getUserAuth();
  const newGradeOutcome = insertGradeOutcomeSchema.parse({
    ...gradeOutcome,
    userId: session?.user.id!,
  });
  try {
    const [g] = await db
      .insert(gradeOutcomes)
      .values(newGradeOutcome)
      .returning();
    return { gradeOutcome: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateGradeOutcome = async (
  id: GradeOutcomeId,
  gradeOutcome: UpdateGradeOutcomeParams,
) => {
  const { session } = await getUserAuth();
  const { id: gradeOutcomeId } = gradeOutcomeIdSchema.parse({ id });
  const newGradeOutcome = updateGradeOutcomeSchema.parse({
    ...gradeOutcome,
    userId: session?.user.id!,
  });
  try {
    const [g] = await db
      .update(gradeOutcomes)
      .set({ ...newGradeOutcome, updatedAt: new Date() })
      .where(
        and(
          eq(gradeOutcomes.id, gradeOutcomeId!),
          eq(gradeOutcomes.userId, session?.user.id!),
        ),
      )
      .returning();
    return { gradeOutcome: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteGradeOutcome = async (id: GradeOutcomeId) => {
  const { session } = await getUserAuth();
  const { id: gradeOutcomeId } = gradeOutcomeIdSchema.parse({ id });
  try {
    const [g] = await db
      .delete(gradeOutcomes)
      .where(
        and(
          eq(gradeOutcomes.id, gradeOutcomeId!),
          eq(gradeOutcomes.userId, session?.user.id!),
        ),
      )
      .returning();
    return { gradeOutcome: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};