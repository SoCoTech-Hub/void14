import { getQuestionAttemptStepById, getQuestionAttemptSteps } from "../api/questionAttemptSteps/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  questionAttemptStepIdSchema,
  insertQuestionAttemptStepParams,
  updateQuestionAttemptStepParams,
} from "@soco/question-db/schema/questionAttemptSteps";
import { createQuestionAttemptStep, deleteQuestionAttemptStep, updateQuestionAttemptStep } from "../api/questionAttemptSteps/mutations";

export const questionAttemptStepsRouter =createTRPCRouter({
  getQuestionAttemptSteps: publicProcedure.query(async () => {
    return getQuestionAttemptSteps();
  }),
  getQuestionAttemptStepById: publicProcedure.input(questionAttemptStepIdSchema).query(async ({ input }) => {
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
