import { getQuestionTruefalseById, getQuestionTruefalse } from "../api/questionTruefalse/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  questionTruefalseIdSchema,
  insertQuestionTruefalseParams,
  updateQuestionTruefalseParams,
} from "@soco/question-db/schema/questionTruefalse";
import { createQuestionTruefalse, deleteQuestionTruefalse, updateQuestionTruefalse } from "../api/questionTruefalse/mutations";

export const questionTruefalseRouter =createTRPCRouter({
  getQuestionTruefalse: publicProcedure.query(async () => {
    return getQuestionTruefalse();
  }),
  getQuestionTruefalseById: publicProcedure.input(questionTruefalseIdSchema).query(async ({ input }) => {
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
