import { getBlogById, getBlogs } from "@/lib/api/blogs/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  blogIdSchema,
  insertBlogParams,
  updateBlogParams,
} from "@/lib/db/schema/blogs";
import { createBlog, deleteBlog, updateBlog } from "@/lib/api/blogs/mutations";

export const blogsRouter = router({
  getBlogs: publicProcedure.query(async () => {
    return getBlogs();
  }),
  getBlogById: publicProcedure.input(blogIdSchema).query(async ({ input }) => {
    return getBlogById(input.id);
  }),
  createBlog: publicProcedure
    .input(insertBlogParams)
    .mutation(async ({ input }) => {
      return createBlog(input);
    }),
  updateBlog: publicProcedure
    .input(updateBlogParams)
    .mutation(async ({ input }) => {
      return updateBlog(input.id, input);
    }),
  deleteBlog: publicProcedure
    .input(blogIdSchema)
    .mutation(async ({ input }) => {
      return deleteBlog(input.id);
    }),
});
