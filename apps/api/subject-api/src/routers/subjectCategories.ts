import { getSubjectCategoryById, getSubjectCategories } from "../api/subjectCategories/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  subjectCategoryIdSchema,
  insertSubjectCategoryParams,
  updateSubjectCategoryParams,
} from "@soco/subject-db/schema/subjectCategories";
import { createSubjectCategory, deleteSubjectCategory, updateSubjectCategory } from "../api/subjectCategories/mutations";

export const subjectCategoriesRouter =createTRPCRouter({
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
