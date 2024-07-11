import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/comment-db";
import { db } from "@soco/comment-db/client";
import {
  CommentId,
  commentIdSchema,
  comments,
  insertCommentSchema,
  NewCommentParams,
  UpdateCommentParams,
  updateCommentSchema,
} from "@soco/comment-db/schema/comments";

export const createComment = async (comment: NewCommentParams) => {
  const { session } = await getUserAuth();
  const newComment = insertCommentSchema.parse({
    ...comment,
    userId: session?.user.id!,
  });
  try {
    const [c] = await db.insert(comments).values(newComment).returning();
    return { comment: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateComment = async (
  id: CommentId,
  comment: UpdateCommentParams,
) => {
  const { session } = await getUserAuth();
  const { id: commentId } = commentIdSchema.parse({ id });
  const newComment = updateCommentSchema.parse({
    ...comment,
    userId: session?.user.id!,
  });
  try {
    const [c] = await db
      .update(comments)
      .set({ ...newComment, updatedAt: new Date() })
      .where(
        and(
          eq(comments.id, commentId!),
          eq(comments.userId, session?.user.id!),
        ),
      )
      .returning();
    return { comment: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteComment = async (id: CommentId) => {
  const { session } = await getUserAuth();
  const { id: commentId } = commentIdSchema.parse({ id });
  try {
    const [c] = await db
      .delete(comments)
      .where(
        and(
          eq(comments.id, commentId!),
          eq(comments.userId, session?.user.id!),
        ),
      )
      .returning();
    return { comment: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
