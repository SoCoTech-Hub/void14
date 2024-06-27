import { getGradeOutcomeById, getGradeOutcomes } from "@/lib/api/gradeOutcomes/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  gradeOutcomeIdSchema,
  insertGradeOutcomeParams,
  updateGradeOutcomeParams,
} from "@/lib/db/schema/gradeOutcomes";
import { createGradeOutcome, deleteGradeOutcome, updateGradeOutcome } from "@/lib/api/gradeOutcomes/mutations";

export const gradeOutcomesRouter = router({
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
