import {
  createScaleHistory,
  deleteScaleHistory,
  updateScaleHistory,
} from "../api/scaleHistories/mutations";
import {
  getScaleHistories,
  getScaleHistoryById,
} from "../api/scaleHistories/queries";
import {
  insertScaleHistoryParams,
  scaleHistoryIdSchema,
  updateScaleHistoryParams,
} from "../db/schema/scaleHistories";
import { publicProcedure, router } from "../server/trpc";

export const scaleHistoriesRouter = router({
  getScaleHistories: publicProcedure.query(async () => {
    return getScaleHistories();
  }),
  getScaleHistoryById: publicProcedure
    .input(scaleHistoryIdSchema)
    .query(async ({ input }) => {
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
