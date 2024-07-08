import { getQuestionDatasetById, getQuestionDatasets } from "../api/questionDatasets/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  questionDatasetIdSchema,
  insertQuestionDatasetParams,
  updateQuestionDatasetParams,
} from "@soco/question-db/schema/questionDatasets";
import { createQuestionDataset, deleteQuestionDataset, updateQuestionDataset } from "../api/questionDatasets/mutations";

export const questionDatasetsRouter =createTRPCRouter({
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
