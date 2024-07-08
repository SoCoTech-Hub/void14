import { getGradeCategoryById, getGradeCategories } from "../api/gradeCategories/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  gradeCategoryIdSchema,
  insertGradeCategoryParams,
  updateGradeCategoryParams,
} from "@soco/grade-db/schema/gradeCategories";
import { createGradeCategory, deleteGradeCategory, updateGradeCategory } from "../api/gradeCategories/mutations";

export const gradeCategoriesRouter =createTRPCRouter({
  getGradeCategories: publicProcedure.query(async () => {
    return getGradeCategories();
  }),
  getGradeCategoryById: publicProcedure.input(gradeCategoryIdSchema).query(async ({ input }) => {
    return getGradeCategoryById(input.id);
  }),
  createGradeCategory: publicProcedure
    .input(insertGradeCategoryParams)
    .mutation(async ({ input }) => {
      return createGradeCategory(input);
    }),
  updateGradeCategory: publicProcedure
    .input(updateGradeCategoryParams)
    .mutation(async ({ input }) => {
      return updateGradeCategory(input.id, input);
    }),
  deleteGradeCategory: publicProcedure
    .input(gradeCategoryIdSchema)
    .mutation(async ({ input }) => {
      return deleteGradeCategory(input.id);
    }),
});
