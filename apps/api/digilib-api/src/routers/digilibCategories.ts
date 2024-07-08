import { getDigilibCategoryById, getDigilibCategories } from "../api/digilibCategories/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  digilibCategoryIdSchema,
  insertDigilibCategoryParams,
  updateDigilibCategoryParams,
} from "@soco/digilib-db/schema/digilibCategories";
import { createDigilibCategory, deleteDigilibCategory, updateDigilibCategory } from "../api/digilibCategories/mutations";

export const digilibCategoriesRouter =createTRPCRouter({
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
