import { getGradeOutcomeById, getGradeOutcomes } from "../api/gradeOutcomes/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  gradeOutcomeIdSchema,
  insertGradeOutcomeParams,
  updateGradeOutcomeParams,
} from "@soco/grade-db/schema/gradeOutcomes";
import { createGradeOutcome, deleteGradeOutcome, updateGradeOutcome } from "../api/gradeOutcomes/mutations";

export const gradeOutcomesRouter =createTRPCRouter({
  getGradeOutcomes: publicProcedure.query(async () => {
    return getGradeOutcomes();
  }),
  getGradeOutcomeById: publicProcedure.input(gradeOutcomeIdSchema).query(async ({ input }) => {
    return getGradeOutcomeById(input.id);
  }),
  createGradeOutcome: publicProcedure
    .input(insertGradeOutcomeParams)
    .mutation(async ({ input }) => {
      return createGradeOutcome(input);
    }),
  updateGradeOutcome: publicProcedure
    .input(updateGradeOutcomeParams)
    .mutation(async ({ input }) => {
      return updateGradeOutcome(input.id, input);
    }),
  deleteGradeOutcome: publicProcedure
    .input(gradeOutcomeIdSchema)
    .mutation(async ({ input }) => {
      return deleteGradeOutcome(input.id);
    }),
});
