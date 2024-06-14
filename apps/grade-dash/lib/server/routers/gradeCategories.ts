import { getGradeCategoryById, getGradeCategories } from "@/lib/api/gradeCategories/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  gradeCategoryIdSchema,
  insertGradeCategoryParams,
  updateGradeCategoryParams,
} from "@/lib/db/schema/gradeCategories";
import { createGradeCategory, deleteGradeCategory, updateGradeCategory } from "@/lib/api/gradeCategories/mutations";

export const gradeCategoriesRouter = router({
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
