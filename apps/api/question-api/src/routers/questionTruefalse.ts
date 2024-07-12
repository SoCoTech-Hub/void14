import {
  insertQuestionTruefalseParams,
  questionTruefalseIdSchema,
  updateQuestionTruefalseParams,
} from "@soco/question-db/schema/questionTruefalse";

import {
  createQuestionTruefalse,
  deleteQuestionTruefalse,
  updateQuestionTruefalse,
} from "../api/questionTruefalse/mutations";
import {
  getQuestionTruefalse,
  getQuestionTruefalseById,
} from "../api/questionTruefalse/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const questionTruefalseRouter = createTRPCRouter({
  getQuestionTruefalse: publicProcedure.query(async () => {
    return getQuestionTruefalse();
  }),
  getQuestionTruefalseById: publicProcedure
    .input(questionTruefalseIdSchema)
    .query(async ({ input }) => {
      return getQuestionTruefalseById(input.id);
    }),
  createQuestionTruefalse: publicProcedure
    .input(insertQuestionTruefalseParams)
    .mutation(async ({ input }) => {
      return createQuestionTruefalse(input);
    }),
  updateQuestionTruefalse: publicProcedure
    .input(updateQuestionTruefalseParams)
    .mutation(async ({ input }) => {
      return updateQuestionTruefalse(input.id, input);
    }),
  deleteQuestionTruefalse: publicProcedure
    .input(questionTruefalseIdSchema)
    .mutation(async ({ input }) => {
      return deleteQuestionTruefalse(input.id);
    }),
});
