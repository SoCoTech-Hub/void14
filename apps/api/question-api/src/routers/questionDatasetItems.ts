import {
  insertQuestionDatasetItemParams,
  questionDatasetItemIdSchema,
  updateQuestionDatasetItemParams,
} from "@soco/question-db/schema/questionDatasetItems";

import {
  createQuestionDatasetItem,
  deleteQuestionDatasetItem,
  updateQuestionDatasetItem,
} from "../api/questionDatasetItems/mutations";
import {
  getQuestionDatasetItemById,
  getQuestionDatasetItems,
} from "../api/questionDatasetItems/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const questionDatasetItemsRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getQuestionDatasetItems: publicProcedure.query(async () => {
      return getQuestionDatasetItems();
    }),
    getQuestionDatasetItemById: publicProcedure
      .input(questionDatasetItemIdSchema)
      .query(async ({ input }) => {
        return getQuestionDatasetItemById(input.id);
      }),
    createQuestionDatasetItem: publicProcedure
      .input(insertQuestionDatasetItemParams)
      .mutation(async ({ input }) => {
        return createQuestionDatasetItem(input);
      }),
    updateQuestionDatasetItem: publicProcedure
      .input(updateQuestionDatasetItemParams)
      .mutation(async ({ input }) => {
        return updateQuestionDatasetItem(input.id, input);
      }),
    deleteQuestionDatasetItem: publicProcedure
      .input(questionDatasetItemIdSchema)
      .mutation(async ({ input }) => {
        return deleteQuestionDatasetItem(input.id);
      }),
  });
