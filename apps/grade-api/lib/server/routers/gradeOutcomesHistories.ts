import { getGradeOutcomesHistoryById, getGradeOutcomesHistories } from "@/lib/api/gradeOutcomesHistories/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  gradeOutcomesHistoryIdSchema,
  insertGradeOutcomesHistoryParams,
  updateGradeOutcomesHistoryParams,
} from "@/lib/db/schema/gradeOutcomesHistories";
import { createGradeOutcomesHistory, deleteGradeOutcomesHistory, updateGradeOutcomesHistory } from "@/lib/api/gradeOutcomesHistories/mutations";

export const gradeOutcomesHistoriesRouter = router({
  getGradeOutcomesHistories: publicProcedure.query(async () => {
    return getGradeOutcomesHistories();
  }),
  getGradeOutcomesHistoryById: publicProcedure.input(gradeOutcomesHistoryIdSchema).query(async ({ input }) => {
    return getGradeOutcomesHistoryById(input.id);
  }),
  createGradeOutcomesHistory: publicProcedure
    .input(insertGradeOutcomesHistoryParams)
    .mutation(async ({ input }) => {
      return createGradeOutcomesHistory(input);
    }),
  updateGradeOutcomesHistory: publicProcedure
    .input(updateGradeOutcomesHistoryParams)
    .mutation(async ({ input }) => {
      return updateGradeOutcomesHistory(input.id, input);
    }),
  deleteGradeOutcomesHistory: publicProcedure
    .input(gradeOutcomesHistoryIdSchema)
    .mutation(async ({ input }) => {
      return deleteGradeOutcomesHistory(input.id);
    }),
});
