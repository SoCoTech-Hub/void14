import {
  insertQuestionAttemptStepDataParams,
  questionAttemptStepDataIdSchema,
  updateQuestionAttemptStepDataParams,
} from "@soco/question-db/schema/questionAttemptStepDatas";

import {
  createQuestionAttemptStepData,
  deleteQuestionAttemptStepData,
  updateQuestionAttemptStepData,
} from "../api/questionAttemptStepDatas/mutations";
import {
  getQuestionAttemptStepDataById,
  getQuestionAttemptStepDatas,
} from "../api/questionAttemptStepDatas/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const questionAttemptStepDatasRouter: ReturnType<
  typeof createTRPCRouter
> = createTRPCRouter({
  getQuestionAttemptStepDatas: publicProcedure.query(async () => {
    return getQuestionAttemptStepDatas();
  }),
  getQuestionAttemptStepDataById: publicProcedure
    .input(questionAttemptStepDataIdSchema)
    .query(async ({ input }) => {
      return getQuestionAttemptStepDataById(input.id);
    }),
  createQuestionAttemptStepData: publicProcedure
    .input(insertQuestionAttemptStepDataParams)
    .mutation(async ({ input }) => {
      return createQuestionAttemptStepData(input);
    }),
  updateQuestionAttemptStepData: publicProcedure
    .input(updateQuestionAttemptStepDataParams)
    .mutation(async ({ input }) => {
      return updateQuestionAttemptStepData(input.id, input);
    }),
  deleteQuestionAttemptStepData: publicProcedure
    .input(questionAttemptStepDataIdSchema)
    .mutation(async ({ input }) => {
      return deleteQuestionAttemptStepData(input.id);
    }),
});
