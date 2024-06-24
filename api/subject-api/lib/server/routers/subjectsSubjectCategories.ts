import { getSubjectsSubjectCategoryById, getSubjectsSubjectCategories } from "@/lib/api/subjectsSubjectCategories/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  subjectsSubjectCategoryIdSchema,
  insertSubjectsSubjectCategoryParams,
  updateSubjectsSubjectCategoryParams,
} from "@/lib/db/schema/subjectsSubjectCategories";
import { createSubjectsSubjectCategory, deleteSubjectsSubjectCategory, updateSubjectsSubjectCategory } from "@/lib/api/subjectsSubjectCategories/mutations";

export const subjectsSubjectCategoriesRouter = router({
  getSubjectsSubjectCategories: publicProcedure.query(async () => {
    return getSubjectsSubjectCategories();
  }),
  getSubjectsSubjectCategoryById: publicProcedure.input(subjectsSubjectCategoryIdSchema).query(async ({ input }) => {
    return getSubjectsSubjectCategoryById(input.id);
  }),
  createSubjectsSubjectCategory: publicProcedure
    .input(insertSubjectsSubjectCategoryParams)
    .mutation(async ({ input }) => {
      return createSubjectsSubjectCategory(input);
    }),
  updateSubjectsSubjectCategory: publicProcedure
    .input(updateSubjectsSubjectCategoryParams)
    .mutation(async ({ input }) => {
      return updateSubjectsSubjectCategory(input.id, input);
    }),
  deleteSubjectsSubjectCategory: publicProcedure
    .input(subjectsSubjectCategoryIdSchema)
    .mutation(async ({ input }) => {
      return deleteSubjectsSubjectCategory(input.id);
    }),
});
