import {
  createQuestionTruefalse,
  deleteQuestionTruefalse,
  updateQuestionTruefalse,
} from "../api/questionTruefalse/mutations";
import {
  getQuestionTruefalse,
  getQuestionTruefalseById,
} from "../api/questionTruefalse/queries";
import {
  insertQuestionTruefalseParams,
  questionTruefalseIdSchema,
  updateQuestionTruefalseParams,
} from "../db/schema/questionTruefalse";
import { publicProcedure, router } from "../server/trpc";

export const questionTruefalseRouter = router({
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
