import { getApplicationCategoryById, getApplicationCategories } from "@/lib/api/applicationCategories/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  applicationCategoryIdSchema,
  insertApplicationCategoryParams,
  updateApplicationCategoryParams,
} from "@/lib/db/schema/applicationCategories";
import { createApplicationCategory, deleteApplicationCategory, updateApplicationCategory } from "@/lib/api/applicationCategories/mutations";

export const applicationCategoriesRouter = router({
  getApplicationCategories: publicProcedure.query(async () => {
    return getApplicationCategories();
  }),
  getApplicationCategoryById: publicProcedure.input(applicationCategoryIdSchema).query(async ({ input }) => {
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
