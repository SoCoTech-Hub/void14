import type {
  BlogId,
  NewBlogParams,
  UpdateBlogParams,
} from "@soco/blog-db/schema/blogs";
import { eq } from "@soco/blog-db";
import { db } from "@soco/blog-db/client";
import {
  blogIdSchema,
  blogs,
  insertBlogSchema,
  updateBlogSchema,
} from "@soco/blog-db/schema/blogs";

export const createBlog = async (blog: NewBlogParams) => {
  const newBlog = insertBlogSchema.parse(blog);
  try {
    const [b] = await db.insert(blogs).values(newBlog).returning();
    return { blog: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateBlog = async (id: BlogId, blog: UpdateBlogParams) => {
  const { id: blogId } = blogIdSchema.parse({ id });
  const newBlog = updateBlogSchema.parse(blog);
  try {
    const [b] = await db
      .update(blogs)
      .set({ ...newBlog, updatedAt: new Date() })
      .where(eq(blogs.id, blogId!))
      .returning();
    return { blog: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteBlog = async (id: BlogId) => {
  const { id: blogId } = blogIdSchema.parse({ id });
  try {
    const [b] = await db.delete(blogs).where(eq(blogs.id, blogId!)).returning();
    return { blog: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
