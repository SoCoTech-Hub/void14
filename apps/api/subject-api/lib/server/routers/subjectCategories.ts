import {
  createSubjectCategory,
  deleteSubjectCategory,
  updateSubjectCategory,
} from "../api/subjectCategories/mutations";
import {
  getSubjectCategories,
  getSubjectCategoryById,
} from "../api/subjectCategories/queries";
import {
  insertSubjectCategoryParams,
  subjectCategoryIdSchema,
  updateSubjectCategoryParams,
} from "../db/schema/subjectCategories";
import { publicProcedure, router } from "../server/trpc";

export const subjectCategoriesRouter = router({
  getSubjectCategories: publicProcedure.query(async () => {
    return getSubjectCategories();
  }),
  getSubjectCategoryById: publicProcedure
    .input(subjectCategoryIdSchema)
    .query(async ({ input }) => {
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
