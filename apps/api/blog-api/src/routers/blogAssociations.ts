import {
  blogAssociationIdSchema,
  insertBlogAssociationParams,
  updateBlogAssociationParams,
} from "@soco/blog-db/schema/blogAssociations";

import {
  createBlogAssociation,
  deleteBlogAssociation,
  updateBlogAssociation,
} from "../api/blogAssociations/mutations";
import {
  getBlogAssociationById,
  getBlogAssociations,
} from "../api/blogAssociations/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const blogAssociationsRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
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
