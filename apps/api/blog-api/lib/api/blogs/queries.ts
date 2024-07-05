import { eq } from "drizzle-orm";

import type { BlogId } from "../../db/schema/blogs";
import { db } from "../../db/index";
import { blogIdSchema, blogs } from "../../db/schema/blogs";

export const getBlogs = async () => {
  const rows = await db.select().from(blogs);
  const b = rows;
  return { blogs: b };
};

export const getBlogById = async (id: BlogId) => {
  const { id: blogId } = blogIdSchema.parse({ id });
  const [row] = await db.select().from(blogs).where(eq(blogs.id, blogId));
  if (row === undefined) return {};
  const b = row;
  return { blog: b };
};
