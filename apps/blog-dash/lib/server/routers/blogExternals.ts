import { getBlogExternalById, getBlogExternals } from "@/lib/api/blogExternals/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  blogExternalIdSchema,
  insertBlogExternalParams,
  updateBlogExternalParams,
} from "@/lib/db/schema/blogExternals";
import { createBlogExternal, deleteBlogExternal, updateBlogExternal } from "@/lib/api/blogExternals/mutations";

export const blogExternalsRouter = router({
  getBlogExternals: publicProcedure.query(async () => {
    return getBlogExternals();
  }),
  getBlogExternalById: publicProcedure.input(blogExternalIdSchema).query(async ({ input }) => {
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
