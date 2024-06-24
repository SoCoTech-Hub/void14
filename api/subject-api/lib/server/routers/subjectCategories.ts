import { getSubjectCategoryById, getSubjectCategories } from "@/lib/api/subjectCategories/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  subjectCategoryIdSchema,
  insertSubjectCategoryParams,
  updateSubjectCategoryParams,
} from "@/lib/db/schema/subjectCategories";
import { createSubjectCategory, deleteSubjectCategory, updateSubjectCategory } from "@/lib/api/subjectCategories/mutations";

export const subjectCategoriesRouter = router({
  getSubjectCategories: publicProcedure.query(async () => {
    return getSubjectCategories();
  }),
  getSubjectCategoryById: publicProcedure.input(subjectCategoryIdSchema).query(async ({ input }) => {
    return getSubjectCategoryById(input.id);
  }),
  createSubjectCategory: publicProcedure
    .input(insertSubjectCategoryParams)
    .mutation(async ({ input }) => {
      return createSubjectCategory(input);
    }),
  updateSubjectCategory: publicProcedure
    .input(updateSubjectCategoryParams)
    .mutation(async ({ input }) => {
      return updateSubjectCategory(input.id, input);
    }),
  deleteSubjectCategory: publicProcedure
    .input(subjectCategoryIdSchema)
    .mutation(async ({ input }) => {
      return deleteSubjectCategory(input.id);
    }),
});
