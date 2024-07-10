import { db } from "@soco/comment-db/client";
import { eq, and } from "@soco/comment-db";
import { getUserAuth } from "@/lib/auth/utils";
import { type CommentId, commentIdSchema, comments } from "@soco/comment-db/schema/comments";

export const getComments = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select().from(comments).where(eq(comments.userId, session?.user.id!));
  const c = rows
  return { comments: c };
};

export const getCommentById = async (id: CommentId) => {
  const { session } = await getUserAuth();
  const { id: commentId } = commentIdSchema.parse({ id });
  const [row] = await db.select().from(comments).where(and(eq(comments.id, commentId), eq(comments.userId, session?.user.id!)));
  if (row === undefined) return {};
  const c = row;
  return { comment: c };
};


