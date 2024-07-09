import {
  applicationCategoryIdSchema,
  insertApplicationCategoryParams,
  updateApplicationCategoryParams,
} from "@soco/application-db/schema/applicationCategories";

import {
  createApplicationCategory,
  deleteApplicationCategory,
  updateApplicationCategory,
} from "../api/applicationCategories/mutations";
import {
  getApplicationCategories,
  getApplicationCategoryById,
} from "../api/applicationCategories/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const applicationCategoriesRouter = createTRPCRouter({
  getApplicationCategories: publicProcedure.query(async () => {
    return getApplicationCategories();
  }),
  getApplicationCategoryById: publicProcedure
    .input(applicationCategoryIdSchema)
    .query(async ({ input }) => {
      return getApplicationCategoryById(input.id);
    }),
  createApplicationCategory: publicProcedure
    .input(insertApplicationCategoryParams)
    .mutation(async ({ input }) => {
      return createApplicationCategory(input);
    }),
  updateApplicationCategory: publicProcedure
    .input(updateApplicationCategoryParams)
    .mutation(async ({ input }) => {
      return updateApplicationCategory(input.id, input);
    }),
  deleteApplicationCategory: publicProcedure
    .input(applicationCategoryIdSchema)
    .mutation(async ({ input }) => {
      return deleteApplicationCategory(input.id);
    }),
});
