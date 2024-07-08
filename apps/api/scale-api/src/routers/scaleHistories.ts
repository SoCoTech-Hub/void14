import { getScaleHistoryById, getScaleHistories } from "../api/scaleHistories/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  scaleHistoryIdSchema,
  insertScaleHistoryParams,
  updateScaleHistoryParams,
} from "@soco/scale-db/schema/scaleHistories";
import { createScaleHistory, deleteScaleHistory, updateScaleHistory } from "../api/scaleHistories/mutations";

export const scaleHistoriesRouter =createTRPCRouter({
  getScaleHistories: publicProcedure.query(async () => {
    return getScaleHistories();
  }),
  getScaleHistoryById: publicProcedure.input(scaleHistoryIdSchema).query(async ({ input }) => {
    return getScaleHistoryById(input.id);
  }),
  createScaleHistory: publicProcedure
    .input(insertScaleHistoryParams)
    .mutation(async ({ input }) => {
      return createScaleHistory(input);
    }),
  updateScaleHistory: publicProcedure
    .input(updateScaleHistoryParams)
    .mutation(async ({ input }) => {
      return updateScaleHistory(input.id, input);
    }),
  deleteScaleHistory: publicProcedure
    .input(scaleHistoryIdSchema)
    .mutation(async ({ input }) => {
      return deleteScaleHistory(input.id);
    }),
});
