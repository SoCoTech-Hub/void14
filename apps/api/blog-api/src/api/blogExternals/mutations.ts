import { db } from "@soco/blog-db/client";
import { and, eq } from "@soco/blog-db";
import { 
  type BlogExternalId, 
  type NewBlogExternalParams,
  type UpdateBlogExternalParams, 
  updateBlogExternalSchema,
  insertBlogExternalSchema, 
  blogExternals,
  blogExternalIdSchema 
} from "@soco/blog-db/schema/blogExternals";
import { getUserAuth } from "@soco/auth-service";

export const createBlogExternal = async (blogExternal: NewBlogExternalParams) => {
  const { session } = await getUserAuth();
  const newBlogExternal = insertBlogExternalSchema.parse({ ...blogExternal, userId: session?.user.id! });
  try {
    const [b] =  await db.insert(blogExternals).values(newBlogExternal).returning();
    return { blogExternal: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateBlogExternal = async (id: BlogExternalId, blogExternal: UpdateBlogExternalParams) => {
  const { session } = await getUserAuth();
  const { id: blogExternalId } = blogExternalIdSchema.parse({ id });
  const newBlogExternal = updateBlogExternalSchema.parse({ ...blogExternal, userId: session?.user.id! });
  try {
    const [b] =  await db
     .update(blogExternals)
     .set({...newBlogExternal, updatedAt: new Date() })
     .where(and(eq(blogExternals.id, blogExternalId!), eq(blogExternals.userId, session?.user.id!)))
     .returning();
    return { blogExternal: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteBlogExternal = async (id: BlogExternalId) => {
  const { session } = await getUserAuth();
  const { id: blogExternalId } = blogExternalIdSchema.parse({ id });
  try {
    const [b] =  await db.delete(blogExternals).where(and(eq(blogExternals.id, blogExternalId!), eq(blogExternals.userId, session?.user.id!)))
    .returning();
    return { blogExternal: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

