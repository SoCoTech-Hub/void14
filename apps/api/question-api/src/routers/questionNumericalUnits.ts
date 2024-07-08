import { getQuestionNumericalUnitById, getQuestionNumericalUnits } from "../api/questionNumericalUnits/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  questionNumericalUnitIdSchema,
  insertQuestionNumericalUnitParams,
  updateQuestionNumericalUnitParams,
} from "@soco/question-db/schema/questionNumericalUnits";
import { createQuestionNumericalUnit, deleteQuestionNumericalUnit, updateQuestionNumericalUnit } from "../api/questionNumericalUnits/mutations";

export const questionNumericalUnitsRouter =createTRPCRouter({
  getQuestionNumericalUnits: publicProcedure.query(async () => {
    return getQuestionNumericalUnits();
  }),
  getQuestionNumericalUnitById: publicProcedure.input(questionNumericalUnitIdSchema).query(async ({ input }) => {
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
