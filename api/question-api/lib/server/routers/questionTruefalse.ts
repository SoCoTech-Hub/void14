import { getQuestionTruefalseById, getQuestionTruefalse } from "@/lib/api/questionTruefalse/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  questionTruefalseIdSchema,
  insertQuestionTruefalseParams,
  updateQuestionTruefalseParams,
} from "@/lib/db/schema/questionTruefalse";
import { createQuestionTruefalse, deleteQuestionTruefalse, updateQuestionTruefalse } from "@/lib/api/questionTruefalse/mutations";

export const questionTruefalseRouter = router({
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
