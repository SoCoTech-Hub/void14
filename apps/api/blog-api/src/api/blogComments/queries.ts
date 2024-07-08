import { db } from "@soco/blog-db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { type BlogCommentId, blogCommentIdSchema, blogComments } from "@soco/blog-db/schema/blogComments";
import { blogs } from "@soco/blog-db/schema/blogs";

export const getBlogComments = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select({ blogComment: blogComments, blog: blogs }).from(blogComments).leftJoin(blogs, eq(blogComments.blogId, blogs.id)).where(eq(blogComments.userId, session?.user.id!));
  const b = rows .map((r) => ({ ...r.blogComment, blog: r.blog})); 
  return { blogComments: b };
};

export const getBlogCommentById = async (id: BlogCommentId) => {
  const { session } = await getUserAuth();
  const { id: blogCommentId } = blogCommentIdSchema.parse({ id });
  const [row] = await db.select({ blogComment: blogComments, blog: blogs }).from(blogComments).where(and(eq(blogComments.id, blogCommentId), eq(blogComments.userId, session?.user.id!))).leftJoin(blogs, eq(blogComments.blogId, blogs.id));
  if (row === undefined) return {};
  const b =  { ...row.blogComment, blog: row.blog } ;
  return { blogComment: b };
};


