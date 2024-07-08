import { db } from "@soco/blog-db/index";
import { and, eq } from "drizzle-orm";
import { 
  BlogCommentId, 
  NewBlogCommentParams,
  UpdateBlogCommentParams, 
  updateBlogCommentSchema,
  insertBlogCommentSchema, 
  blogComments,
  blogCommentIdSchema 
} from "@soco/blog-db/schema/blogComments";
import { getUserAuth } from "@/lib/auth/utils";

export const createBlogComment = async (blogComment: NewBlogCommentParams) => {
  const { session } = await getUserAuth();
  const newBlogComment = insertBlogCommentSchema.parse({ ...blogComment, userId: session?.user.id! });
  try {
    const [b] =  await db.insert(blogComments).values(newBlogComment).returning();
    return { blogComment: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateBlogComment = async (id: BlogCommentId, blogComment: UpdateBlogCommentParams) => {
  const { session } = await getUserAuth();
  const { id: blogCommentId } = blogCommentIdSchema.parse({ id });
  const newBlogComment = updateBlogCommentSchema.parse({ ...blogComment, userId: session?.user.id! });
  try {
    const [b] =  await db
     .update(blogComments)
     .set({...newBlogComment, updatedAt: new Date() })
     .where(and(eq(blogComments.id, blogCommentId!), eq(blogComments.userId, session?.user.id!)))
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
    const [b] =  await db.delete(blogComments).where(and(eq(blogComments.id, blogCommentId!), eq(blogComments.userId, session?.user.id!)))
    .returning();
    return { blogComment: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

