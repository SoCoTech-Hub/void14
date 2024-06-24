import { getQuestionDatasetById, getQuestionDatasets } from "@/lib/api/questionDatasets/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  questionDatasetIdSchema,
  insertQuestionDatasetParams,
  updateQuestionDatasetParams,
} from "@/lib/db/schema/questionDatasets";
import { createQuestionDataset, deleteQuestionDataset, updateQuestionDataset } from "@/lib/api/questionDatasets/mutations";

export const questionDatasetsRouter = router({
  getQuestionDatasets: publicProcedure.query(async () => {
    return getQuestionDatasets();
  }),
  getQuestionDatasetById: publicProcedure.input(questionDatasetIdSchema).query(async ({ input }) => {
    return getQuestionDatasetById(input.id);
  }),
  createQuestionDataset: publicProcedure
    .input(insertQuestionDatasetParams)
    .mutation(async ({ input }) => {
      return createQuestionDataset(input);
    }),
  updateQuestionDataset: publicProcedure
    .input(updateQuestionDatasetParams)
    .mutation(async ({ input }) => {
      return updateQuestionDataset(input.id, input);
    }),
  deleteQuestionDataset: publicProcedure
    .input(questionDatasetIdSchema)
    .mutation(async ({ input }) => {
      return deleteQuestionDataset(input.id);
    }),
});
