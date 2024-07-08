import { getGradeOutcomesHistoryById, getGradeOutcomesHistories } from "../api/gradeOutcomesHistories/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  gradeOutcomesHistoryIdSchema,
  insertGradeOutcomesHistoryParams,
  updateGradeOutcomesHistoryParams,
} from "@soco/grade-db/schema/gradeOutcomesHistories";
import { createGradeOutcomesHistory, deleteGradeOutcomesHistory, updateGradeOutcomesHistory } from "../api/gradeOutcomesHistories/mutations";

export const gradeOutcomesHistoriesRouter =createTRPCRouter({
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
