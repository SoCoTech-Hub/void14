import {
  createQuestionNumerical,
  deleteQuestionNumerical,
  updateQuestionNumerical,
} from "../api/questionNumericals/mutations";
import {
  getQuestionNumericalById,
  getQuestionNumericals,
} from "../api/questionNumericals/queries";
import {
  insertQuestionNumericalParams,
  questionNumericalIdSchema,
  updateQuestionNumericalParams,
} from "../db/schema/questionNumericals";
import { publicProcedure, router } from "../server/trpc";

export const questionNumericalsRouter = router({
  getQuestionNumericals: publicProcedure.query(async () => {
    return getQuestionNumericals();
  }),
  getQuestionNumericalById: publicProcedure
    .input(questionNumericalIdSchema)
    .query(async ({ input }) => {
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
