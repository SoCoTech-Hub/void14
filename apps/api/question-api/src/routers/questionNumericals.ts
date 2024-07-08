import { getQuestionNumericalById, getQuestionNumericals } from "../api/questionNumericals/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  questionNumericalIdSchema,
  insertQuestionNumericalParams,
  updateQuestionNumericalParams,
} from "@soco/question-db/schema/questionNumericals";
import { createQuestionNumerical, deleteQuestionNumerical, updateQuestionNumerical } from "../api/questionNumericals/mutations";

export const questionNumericalsRouter =createTRPCRouter({
  getQuestionNumericals: publicProcedure.query(async () => {
    return getQuestionNumericals();
  }),
  getQuestionNumericalById: publicProcedure.input(questionNumericalIdSchema).query(async ({ input }) => {
    return getQuestionNumericalById(input.id);
  }),
  createQuestionNumerical: publicProcedure
    .input(insertQuestionNumericalParams)
    .mutation(async ({ input }) => {
      return createQuestionNumerical(input);
    }),
  updateQuestionNumerical: publicProcedure
    .input(updateQuestionNumericalParams)
    .mutation(async ({ input }) => {
      return updateQuestionNumerical(input.id, input);
    }),
  deleteQuestionNumerical: publicProcedure
    .input(questionNumericalIdSchema)
    .mutation(async ({ input }) => {
      return deleteQuestionNumerical(input.id);
    }),
});
