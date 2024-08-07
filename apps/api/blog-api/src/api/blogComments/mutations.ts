import type {
  BlogCommentId,
  NewBlogCommentParams,
  UpdateBlogCommentParams,
} from "@soco/blog-db/schema/blogComments";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/blog-db";
import { db } from "@soco/blog-db/client";
import {
  blogCommentIdSchema,
  blogComments,
  insertBlogCommentSchema,
  updateBlogCommentSchema,
} from "@soco/blog-db/schema/blogComments";

export const createBlogComment = async (blogComment: NewBlogCommentParams) => {
  const { session } = await getUserAuth();
  const newBlogComment = insertBlogCommentSchema.parse({
    ...blogComment,
    userId: session?.user.id!,
  });
  try {
    const [b] = await db
      .insert(blogComments)
      .values(newBlogComment)
      .returning();
    return { blogComment: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateBlogComment = async (
  id: BlogCommentId,
  blogComment: UpdateBlogCommentParams,
) => {
  const { session } = await getUserAuth();
  const { id: blogCommentId } = blogCommentIdSchema.parse({ id });
  const newBlogComment = updateBlogCommentSchema.parse({
    ...blogComment,
    userId: session?.user.id!,
  });
  try {
    const [b] = await db
      .update(blogComments)
      .set({ ...newBlogComment, updatedAt: new Date() })
      .where(
        and(
          eq(blogComments.id, blogCommentId!),
          eq(blogComments.userId, session?.user.id!),
        ),
      )
      .returning();
    return { blogComment: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteBlogComment = async (id: BlogCommentId) => {
  const { session } = await getUserAuth();
  const { id: blogCommentId } = blogCommentIdSchema.parse({ id });
  try {
    const [b] = await db
      .delete(blogComments)
      .where(
        and(
          eq(blogComments.id, blogCommentId!),
          eq(blogComments.userId, session?.user.id!),
        ),
      )
      .returning();
    return { blogComment: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
