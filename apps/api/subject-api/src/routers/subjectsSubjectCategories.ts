import {
  insertSubjectsSubjectCategoryParams,
  subjectsSubjectCategoryIdSchema,
  updateSubjectsSubjectCategoryParams,
} from "@soco/subject-db/schema/subjectsSubjectCategories";

import {
  createSubjectsSubjectCategory,
  deleteSubjectsSubjectCategory,
  updateSubjectsSubjectCategory,
} from "../api/subjectsSubjectCategories/mutations";
import {
  getSubjectsSubjectCategories,
  getSubjectsSubjectCategoryById,
} from "../api/subjectsSubjectCategories/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const subjectsSubjectCategoriesRouter: ReturnType<
  typeof createTRPCRouter
> = createTRPCRouter({
  getSubjectsSubjectCategories: publicProcedure.query(async () => {
    return getSubjectsSubjectCategories();
  }),
  getSubjectsSubjectCategoryById: publicProcedure
    .input(subjectsSubjectCategoryIdSchema)
    .query(async ({ input }) => {
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
