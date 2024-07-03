import { getBlogAssociationById, getBlogAssociations } from "@/lib/api/blogAssociations/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  blogAssociationIdSchema,
  insertBlogAssociationParams,
  updateBlogAssociationParams,
} from "@/lib/db/schema/blogAssociations";
import { createBlogAssociation, deleteBlogAssociation, updateBlogAssociation } from "@/lib/api/blogAssociations/mutations";

export const blogAssociationsRouter = router({
  getBlogAssociations: publicProcedure.query(async () => {
    return getBlogAssociations();
  }),
  getBlogAssociationById: publicProcedure.input(blogAssociationIdSchema).query(async ({ input }) => {
    return getBlogAssociationById(input.id);
  }),
  createBlogAssociation: publicProcedure
    .input(insertBlogAssociationParams)
    .mutation(async ({ input }) => {
      return createBlogAssociation(input);
    }),
  updateBlogAssociation: publicProcedure
    .input(updateBlogAssociationParams)
    .mutation(async ({ input }) => {
      return updateBlogAssociation(input.id, input);
    }),
  deleteBlogAssociation: publicProcedure
    .input(blogAssociationIdSchema)
    .mutation(async ({ input }) => {
      return deleteBlogAssociation(input.id);
    }),
});
