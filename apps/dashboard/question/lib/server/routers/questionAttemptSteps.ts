import { getQuestionAttemptStepById, getQuestionAttemptSteps } from "@/lib/api/questionAttemptSteps/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  questionAttemptStepIdSchema,
  insertQuestionAttemptStepParams,
  updateQuestionAttemptStepParams,
} from "@/lib/db/schema/questionAttemptSteps";
import { createQuestionAttemptStep, deleteQuestionAttemptStep, updateQuestionAttemptStep } from "@/lib/api/questionAttemptSteps/mutations";

export const questionAttemptStepsRouter = router({
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
