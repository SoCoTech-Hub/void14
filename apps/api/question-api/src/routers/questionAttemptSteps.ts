import {
  insertQuestionAttemptStepParams,
  questionAttemptStepIdSchema,
  updateQuestionAttemptStepParams,
} from "@soco/question-db/schema/questionAttemptSteps";

import {
  createQuestionAttemptStep,
  deleteQuestionAttemptStep,
  updateQuestionAttemptStep,
} from "../api/questionAttemptSteps/mutations";
import {
  getQuestionAttemptStepById,
  getQuestionAttemptSteps,
} from "../api/questionAttemptSteps/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const questionAttemptStepsRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
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
