import type {
  GradingformGuideCommentId,
  NewGradingformGuideCommentParams,
  UpdateGradingformGuideCommentParams,
} from "@soco/grade-db/schema/gradingformGuideComments";
import { eq } from "@soco/grade-db";
import { db } from "@soco/grade-db/client";
import {
  gradingformGuideCommentIdSchema,
  gradingformGuideComments,
  insertGradingformGuideCommentSchema,
  updateGradingformGuideCommentSchema,
} from "@soco/grade-db/schema/gradingformGuideComments";

export const createGradingformGuideComment = async (
  gradingformGuideComment: NewGradingformGuideCommentParams,
) => {
  const newGradingformGuideComment = insertGradingformGuideCommentSchema.parse(
    gradingformGuideComment,
  );
  try {
    const [g] = await db
      .insert(gradingformGuideComments)
      .values(newGradingformGuideComment)
      .returning();
    return { gradingformGuideComment: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateGradingformGuideComment = async (
  id: GradingformGuideCommentId,
  gradingformGuideComment: UpdateGradingformGuideCommentParams,
) => {
  const { id: gradingformGuideCommentId } =
    gradingformGuideCommentIdSchema.parse({ id });
  const newGradingformGuideComment = updateGradingformGuideCommentSchema.parse(
    gradingformGuideComment,
  );
  try {
    const [g] = await db
      .update(gradingformGuideComments)
      .set(newGradingformGuideComment)
      .where(eq(gradingformGuideComments.id, gradingformGuideCommentId!))
      .returning();
    return { gradingformGuideComment: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteGradingformGuideComment = async (
  id: GradingformGuideCommentId,
) => {
  const { id: gradingformGuideCommentId } =
    gradingformGuideCommentIdSchema.parse({ id });
  try {
    const [g] = await db
      .delete(gradingformGuideComments)
      .where(eq(gradingformGuideComments.id, gradingformGuideCommentId!))
      .returning();
    return { gradingformGuideComment: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
