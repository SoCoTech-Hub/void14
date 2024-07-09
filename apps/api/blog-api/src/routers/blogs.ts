import {
  blogIdSchema,
  insertBlogParams,
  updateBlogParams,
} from "@soco/blog-db/schema/blogs";

import { createBlog, deleteBlog, updateBlog } from "../api/blogs/mutations";
import { getBlogById, getBlogs } from "../api/blogs/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const blogsRouter = createTRPCRouter({
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
