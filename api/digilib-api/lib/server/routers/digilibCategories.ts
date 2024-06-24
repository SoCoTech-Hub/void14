import { getDigilibCategoryById, getDigilibCategories } from "@/lib/api/digilibCategories/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  digilibCategoryIdSchema,
  insertDigilibCategoryParams,
  updateDigilibCategoryParams,
} from "@/lib/db/schema/digilibCategories";
import { createDigilibCategory, deleteDigilibCategory, updateDigilibCategory } from "@/lib/api/digilibCategories/mutations";

export const digilibCategoriesRouter = router({
  getDigilibCategories: publicProcedure.query(async () => {
    return getDigilibCategories();
  }),
  getDigilibCategoryById: publicProcedure.input(digilibCategoryIdSchema).query(async ({ input }) => {
    return getDigilibCategoryById(input.id);
  }),
  createDigilibCategory: publicProcedure
    .input(insertDigilibCategoryParams)
    .mutation(async ({ input }) => {
      return createDigilibCategory(input);
    }),
  updateDigilibCategory: publicProcedure
    .input(updateDigilibCategoryParams)
    .mutation(async ({ input }) => {
      return updateDigilibCategory(input.id, input);
    }),
  deleteDigilibCategory: publicProcedure
    .input(digilibCategoryIdSchema)
    .mutation(async ({ input }) => {
      return deleteDigilibCategory(input.id);
    }),
});
