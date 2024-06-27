import { getQuestionCategoryById, getQuestionCategories } from "@/lib/api/questionCategories/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  questionCategoryIdSchema,
  insertQuestionCategoryParams,
  updateQuestionCategoryParams,
} from "@/lib/db/schema/questionCategories";
import { createQuestionCategory, deleteQuestionCategory, updateQuestionCategory } from "@/lib/api/questionCategories/mutations";

export const questionCategoriesRouter = router({
  getQuestionCategories: publicProcedure.query(async () => {
    return getQuestionCategories();
  }),
  getQuestionCategoryById: publicProcedure.input(questionCategoryIdSchema).query(async ({ input }) => {
    return getQuestionCategoryById(input.id);
  }),
  createQuestionCategory: publicProcedure
    .input(insertQuestionCategoryParams)
    .mutation(async ({ input }) => {
      return createQuestionCategory(input);
    }),
  updateQuestionCategory: publicProcedure
    .input(updateQuestionCategoryParams)
    .mutation(async ({ input }) => {
      return updateQuestionCategory(input.id, input);
    }),
  deleteQuestionCategory: publicProcedure
    .input(questionCategoryIdSchema)
    .mutation(async ({ input }) => {
      return deleteQuestionCategory(input.id);
    }),
});
