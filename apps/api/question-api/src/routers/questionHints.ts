import {
  insertQuestionHintParams,
  questionHintIdSchema,
  updateQuestionHintParams,
} from "@soco/question-db/schema/questionHints";

import {
  createQuestionHint,
  deleteQuestionHint,
  updateQuestionHint,
} from "../api/questionHints/mutations";
import {
  getQuestionHintById,
  getQuestionHints,
} from "../api/questionHints/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const questionHintsRouter = createTRPCRouter({
  getQuestionHints: publicProcedure.query(async () => {
    return getQuestionHints();
  }),
  getQuestionHintById: publicProcedure
    .input(questionHintIdSchema)
    .query(async ({ input }) => {
      return getQuestionHintById(input.id);
    }),
  createQuestionHint: publicProcedure
    .input(insertQuestionHintParams)
    .mutation(async ({ input }) => {
      return createQuestionHint(input);
    }),
  updateQuestionHint: publicProcedure
    .input(updateQuestionHintParams)
    .mutation(async ({ input }) => {
      return updateQuestionHint(input.id, input);
    }),
  deleteQuestionHint: publicProcedure
    .input(questionHintIdSchema)
    .mutation(async ({ input }) => {
      return deleteQuestionHint(input.id);
    }),
});
