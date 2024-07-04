import {
  createQuestionAttemptStepData,
  deleteQuestionAttemptStepData,
  updateQuestionAttemptStepData,
} from "../api/questionAttemptStepDatas/mutations";
import {
  getQuestionAttemptStepDataById,
  getQuestionAttemptStepDatas,
} from "../api/questionAttemptStepDatas/queries";
import {
  insertQuestionAttemptStepDataParams,
  questionAttemptStepDataIdSchema,
  updateQuestionAttemptStepDataParams,
} from "../db/schema/questionAttemptStepDatas";
import { publicProcedure, router } from "../server/trpc";

export const questionAttemptStepDatasRouter = router({
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
