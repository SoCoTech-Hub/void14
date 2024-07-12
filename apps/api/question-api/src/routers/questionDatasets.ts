import {
  insertQuestionDatasetParams,
  questionDatasetIdSchema,
  updateQuestionDatasetParams,
} from "@soco/question-db/schema/questionDatasets";

import {
  createQuestionDataset,
  deleteQuestionDataset,
  updateQuestionDataset,
} from "../api/questionDatasets/mutations";
import {
  getQuestionDatasetById,
  getQuestionDatasets,
} from "../api/questionDatasets/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const questionDatasetsRouter = createTRPCRouter({
  getQuestionDatasets: publicProcedure.query(async () => {
    return getQuestionDatasets();
  }),
  getQuestionDatasetById: publicProcedure
    .input(questionDatasetIdSchema)
    .query(async ({ input }) => {
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
