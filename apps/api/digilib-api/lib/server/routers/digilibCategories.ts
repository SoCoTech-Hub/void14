import {
  createDigilibCategory,
  deleteDigilibCategory,
  updateDigilibCategory,
} from "../api/digilibCategories/mutations";
import {
  getDigilibCategories,
  getDigilibCategoryById,
} from "../api/digilibCategories/queries";
import {
  digilibCategoryIdSchema,
  insertDigilibCategoryParams,
  updateDigilibCategoryParams,
} from "../db/schema/digilibCategories";
import { publicProcedure, router } from "../server/trpc";

export const digilibCategoriesRouter = router({
  getDigilibCategories: publicProcedure.query(async () => {
    return getDigilibCategories();
  }),
  getDigilibCategoryById: publicProcedure
    .input(digilibCategoryIdSchema)
    .query(async ({ input }) => {
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
