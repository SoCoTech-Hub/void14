import {
  blogExternalIdSchema,
  insertBlogExternalParams,
  updateBlogExternalParams,
} from "@soco/blog-db/schema/blogExternals";

import {
  createBlogExternal,
  deleteBlogExternal,
  updateBlogExternal,
} from "../api/blogExternals/mutations";
import {
  getBlogExternalById,
  getBlogExternals,
} from "../api/blogExternals/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const blogExternalsRouter = createTRPCRouter({
  getBlogExternals: publicProcedure.query(async () => {
    return getBlogExternals();
  }),
  getBlogExternalById: publicProcedure
    .input(blogExternalIdSchema)
    .query(async ({ input }) => {
      return getBlogExternalById(input.id);
    }),
  createBlogExternal: publicProcedure
    .input(insertBlogExternalParams)
    .mutation(async ({ input }) => {
      return createBlogExternal(input);
    }),
  updateBlogExternal: publicProcedure
    .input(updateBlogExternalParams)
    .mutation(async ({ input }) => {
      return updateBlogExternal(input.id, input);
    }),
  deleteBlogExternal: publicProcedure
    .input(blogExternalIdSchema)
    .mutation(async ({ input }) => {
      return deleteBlogExternal(input.id);
    }),
});
