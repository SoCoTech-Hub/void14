import {
  insertQuestionResponseAnalysiseParams,
  questionResponseAnalysiseIdSchema,
  updateQuestionResponseAnalysiseParams,
} from "@soco/question-db/schema/questionResponseAnalysises";

import {
  createQuestionResponseAnalysise,
  deleteQuestionResponseAnalysise,
  updateQuestionResponseAnalysise,
} from "../api/questionResponseAnalysises/mutations";
import {
  getQuestionResponseAnalysiseById,
  getQuestionResponseAnalysises,
} from "../api/questionResponseAnalysises/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const questionResponseAnalysisesRouter = createTRPCRouter({
  getQuestionResponseAnalysises: publicProcedure.query(async () => {
    return getQuestionResponseAnalysises();
  }),
  getQuestionResponseAnalysiseById: publicProcedure
    .input(questionResponseAnalysiseIdSchema)
    .query(async ({ input }) => {
      return getQuestionResponseAnalysiseById(input.id);
    }),
  createQuestionResponseAnalysise: publicProcedure
    .input(insertQuestionResponseAnalysiseParams)
    .mutation(async ({ input }) => {
      return createQuestionResponseAnalysise(input);
    }),
  updateQuestionResponseAnalysise: publicProcedure
    .input(updateQuestionResponseAnalysiseParams)
    .mutation(async ({ input }) => {
      return updateQuestionResponseAnalysise(input.id, input);
    }),
  deleteQuestionResponseAnalysise: publicProcedure
    .input(questionResponseAnalysiseIdSchema)
    .mutation(async ({ input }) => {
      return deleteQuestionResponseAnalysise(input.id);
    }),
});
