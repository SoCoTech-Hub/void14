import { getQuestionNumericalUnitById, getQuestionNumericalUnits } from "@/lib/api/questionNumericalUnits/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  questionNumericalUnitIdSchema,
  insertQuestionNumericalUnitParams,
  updateQuestionNumericalUnitParams,
} from "@/lib/db/schema/questionNumericalUnits";
import { createQuestionNumericalUnit, deleteQuestionNumericalUnit, updateQuestionNumericalUnit } from "@/lib/api/questionNumericalUnits/mutations";

export const questionNumericalUnitsRouter = router({
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
