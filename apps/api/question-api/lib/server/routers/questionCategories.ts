import {
  createQuestionCategory,
  deleteQuestionCategory,
  updateQuestionCategory,
} from "../api/questionCategories/mutations";
import {
  getQuestionCategories,
  getQuestionCategoryById,
} from "../api/questionCategories/queries";
import {
  insertQuestionCategoryParams,
  questionCategoryIdSchema,
  updateQuestionCategoryParams,
} from "../db/schema/questionCategories";
import { publicProcedure, router } from "../server/trpc";

export const questionCategoriesRouter = router({
  getQuestionCategories: publicProcedure.query(async () => {
    return getQuestionCategories();
  }),
  getQuestionCategoryById: publicProcedure
    .input(questionCategoryIdSchema)
    .query(async ({ input }) => {
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
