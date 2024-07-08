import { getQuestionCategoryById, getQuestionCategories } from "../api/questionCategories/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  questionCategoryIdSchema,
  insertQuestionCategoryParams,
  updateQuestionCategoryParams,
} from "@soco/question-db/schema/questionCategories";
import { createQuestionCategory, deleteQuestionCategory, updateQuestionCategory } from "../api/questionCategories/mutations";

export const questionCategoriesRouter =createTRPCRouter({
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
