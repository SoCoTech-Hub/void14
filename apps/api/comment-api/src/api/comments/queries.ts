import type { CommentId } from "@soco/comment-db/schema/comments";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/comment-db";
import { db } from "@soco/comment-db/client";
import { commentIdSchema, comments } from "@soco/comment-db/schema/comments";

export const getComments = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(comments)
    .where(eq(comments.userId, session?.user.id!));
  const c = rows;
  return { comments: c };
};

export const getCommentById = async (id: CommentId) => {
  const { session } = await getUserAuth();
  const { id: commentId } = commentIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(comments)
    .where(
      and(eq(comments.id, commentId), eq(comments.userId, session?.user.id!)),
    );
  if (row === undefined) return {};
  const c = row;
  return { comment: c };
};
