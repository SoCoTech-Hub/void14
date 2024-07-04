import {
  createBlogAssociation,
  deleteBlogAssociation,
  updateBlogAssociation,
} from "../api/blogAssociations/mutations";
import {
  getBlogAssociationById,
  getBlogAssociations,
} from "../api/blogAssociations/queries";
import {
  blogAssociationIdSchema,
  insertBlogAssociationParams,
  updateBlogAssociationParams,
} from "../db/schema/blogAssociations";
import { publicProcedure, router } from "../server/trpc";

export const blogAssociationsRouter = router({
  getBlogAssociations: publicProcedure.query(async () => {
    return getBlogAssociations();
  }),
  getBlogAssociationById: publicProcedure
    .input(blogAssociationIdSchema)
    .query(async ({ input }) => {
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
