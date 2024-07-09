import { getSubjectsSubjectCategoryById, getSubjectsSubjectCategories } from "../api/subjectsSubjectCategories/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  subjectsSubjectCategoryIdSchema,
  insertSubjectsSubjectCategoryParams,
  updateSubjectsSubjectCategoryParams,
} from "@soco/subject-db/schema/subjectsSubjectCategories";
import { createSubjectsSubjectCategory, deleteSubjectsSubjectCategory, updateSubjectsSubjectCategory } from "../api/subjectsSubjectCategories/mutations";

export const subjectsSubjectCategoriesRouter =createTRPCRouter({
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