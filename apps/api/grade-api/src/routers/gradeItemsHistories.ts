import { getGradeItemsHistoryById, getGradeItemsHistories } from "../api/gradeItemsHistories/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  gradeItemsHistoryIdSchema,
  insertGradeItemsHistoryParams,
  updateGradeItemsHistoryParams,
} from "@soco/grade-db/schema/gradeItemsHistories";
import { createGradeItemsHistory, deleteGradeItemsHistory, updateGradeItemsHistory } from "../api/gradeItemsHistories/mutations";

export const gradeItemsHistoriesRouter =createTRPCRouter({
  getGradeItemsHistories: publicProcedure.query(async () => {
    return getGradeItemsHistories();
  }),
  getGradeItemsHistoryById: publicProcedure.input(gradeItemsHistoryIdSchema).query(async ({ input }) => {
    return getGradeItemsHistoryById(input.id);
  }),
  createGradeItemsHistory: publicProcedure
    .input(insertGradeItemsHistoryParams)
    .mutation(async ({ input }) => {
      return createGradeItemsHistory(input);
    }),
  updateGradeItemsHistory: publicProcedure
    .input(updateGradeItemsHistoryParams)
    .mutation(async ({ input }) => {
      return updateGradeItemsHistory(input.id, input);
    }),
  deleteGradeItemsHistory: publicProcedure
    .input(gradeItemsHistoryIdSchema)
    .mutation(async ({ input }) => {
      return deleteGradeItemsHistory(input.id);
    }),
});
