import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/grade-db";
import { db } from "@soco/grade-db/client";
import {
  GradeImportValueId,
  gradeImportValueIdSchema,
  gradeImportValues,
  insertGradeImportValueSchema,
  NewGradeImportValueParams,
  UpdateGradeImportValueParams,
  updateGradeImportValueSchema,
} from "@soco/grade-db/schema/gradeImportValues";

export const createGradeImportValue = async (
  gradeImportValue: NewGradeImportValueParams,
) => {
  const { session } = await getUserAuth();
  const newGradeImportValue = insertGradeImportValueSchema.parse({
    ...gradeImportValue,
    userId: session?.user.id!,
  });
  try {
    const [g] = await db
      .insert(gradeImportValues)
      .values(newGradeImportValue)
      .returning();
    return { gradeImportValue: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateGradeImportValue = async (
  id: GradeImportValueId,
  gradeImportValue: UpdateGradeImportValueParams,
) => {
  const { session } = await getUserAuth();
  const { id: gradeImportValueId } = gradeImportValueIdSchema.parse({ id });
  const newGradeImportValue = updateGradeImportValueSchema.parse({
    ...gradeImportValue,
    userId: session?.user.id!,
  });
  try {
    const [g] = await db
      .update(gradeImportValues)
      .set(newGradeImportValue)
      .where(
        and(
          eq(gradeImportValues.id, gradeImportValueId!),
          eq(gradeImportValues.userId, session?.user.id!),
        ),
      )
      .returning();
    return { gradeImportValue: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteGradeImportValue = async (id: GradeImportValueId) => {
  const { session } = await getUserAuth();
  const { id: gradeImportValueId } = gradeImportValueIdSchema.parse({ id });
  try {
    const [g] = await db
      .delete(gradeImportValues)
      .where(
        and(
          eq(gradeImportValues.id, gradeImportValueId!),
          eq(gradeImportValues.userId, session?.user.id!),
        ),
      )
      .returning();
    return { gradeImportValue: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
