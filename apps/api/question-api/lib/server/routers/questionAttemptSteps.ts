import {
  createQuestionAttemptStep,
  deleteQuestionAttemptStep,
  updateQuestionAttemptStep,
} from "../api/questionAttemptSteps/mutations";
import {
  getQuestionAttemptStepById,
  getQuestionAttemptSteps,
} from "../api/questionAttemptSteps/queries";
import {
  insertQuestionAttemptStepParams,
  questionAttemptStepIdSchema,
  updateQuestionAttemptStepParams,
} from "../db/schema/questionAttemptSteps";
import { publicProcedure, router } from "../server/trpc";

export const questionAttemptStepsRouter = router({
  getQuestionAttemptSteps: publicProcedure.query(async () => {
    return getQuestionAttemptSteps();
  }),
  getQuestionAttemptStepById: publicProcedure
    .input(questionAttemptStepIdSchema)
    .query(async ({ input }) => {
      return getQuestionAttemptStepById(input.id);
    }),
  createQuestionAttemptStep: publicProcedure
    .input(insertQuestionAttemptStepParams)
    .mutation(async ({ input }) => {
      return createQuestionAttemptStep(input);
    }),
  updateQuestionAttemptStep: publicProcedure
    .input(updateQuestionAttemptStepParams)
    .mutation(async ({ input }) => {
      return updateQuestionAttemptStep(input.id, input);
    }),
  deleteQuestionAttemptStep: publicProcedure
    .input(questionAttemptStepIdSchema)
    .mutation(async ({ input }) => {
      return deleteQuestionAttemptStep(input.id);
    }),
});
