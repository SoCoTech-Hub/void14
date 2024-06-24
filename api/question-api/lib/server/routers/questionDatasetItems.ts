import { getQuestionDatasetItemById, getQuestionDatasetItems } from "@/lib/api/questionDatasetItems/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  questionDatasetItemIdSchema,
  insertQuestionDatasetItemParams,
  updateQuestionDatasetItemParams,
} from "@/lib/db/schema/questionDatasetItems";
import { createQuestionDatasetItem, deleteQuestionDatasetItem, updateQuestionDatasetItem } from "@/lib/api/questionDatasetItems/mutations";

export const questionDatasetItemsRouter = router({
  getQuestionDatasetItems: publicProcedure.query(async () => {
    return getQuestionDatasetItems();
  }),
  getQuestionDatasetItemById: publicProcedure.input(questionDatasetItemIdSchema).query(async ({ input }) => {
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
