import {
  createQuestionNumericalUnit,
  deleteQuestionNumericalUnit,
  updateQuestionNumericalUnit,
} from "../api/questionNumericalUnits/mutations";
import {
  getQuestionNumericalUnitById,
  getQuestionNumericalUnits,
} from "../api/questionNumericalUnits/queries";
import {
  insertQuestionNumericalUnitParams,
  questionNumericalUnitIdSchema,
  updateQuestionNumericalUnitParams,
} from "../db/schema/questionNumericalUnits";
import { publicProcedure, router } from "../server/trpc";

export const questionNumericalUnitsRouter = router({
  getQuestionNumericalUnits: publicProcedure.query(async () => {
    return getQuestionNumericalUnits();
  }),
  getQuestionNumericalUnitById: publicProcedure
    .input(questionNumericalUnitIdSchema)
    .query(async ({ input }) => {
      return getQuestionNumericalUnitById(input.id);
    }),
  createQuestionNumericalUnit: publicProcedure
    .input(insertQuestionNumericalUnitParams)
    .mutation(async ({ input }) => {
      return createQuestionNumericalUnit(input);
    }),
  updateQuestionNumericalUnit: publicProcedure
    .input(updateQuestionNumericalUnitParams)
    .mutation(async ({ input }) => {
      return updateQuestionNumericalUnit(input.id, input);
    }),
  deleteQuestionNumericalUnit: publicProcedure
    .input(questionNumericalUnitIdSchema)
    .mutation(async ({ input }) => {
      return deleteQuestionNumericalUnit(input.id);
    }),
});
