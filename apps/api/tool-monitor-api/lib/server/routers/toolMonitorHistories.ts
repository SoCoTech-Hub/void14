import {
  createToolMonitorHistory,
  deleteToolMonitorHistory,
  updateToolMonitorHistory,
} from "../api/toolMonitorHistories/mutations";
import {
  getToolMonitorHistories,
  getToolMonitorHistoryById,
} from "../api/toolMonitorHistories/queries";
import {
  insertToolMonitorHistoryParams,
  toolMonitorHistoryIdSchema,
  updateToolMonitorHistoryParams,
} from "../db/schema/toolMonitorHistories";
import { publicProcedure, router } from "../server/trpc";

export const toolMonitorHistoriesRouter = router({
  getToolMonitorHistories: publicProcedure.query(async () => {
    return getToolMonitorHistories();
  }),
  getToolMonitorHistoryById: publicProcedure
    .input(toolMonitorHistoryIdSchema)
    .query(async ({ input }) => {
      return getToolMonitorHistoryById(input.id);
    }),
  createToolMonitorHistory: publicProcedure
    .input(insertToolMonitorHistoryParams)
    .mutation(async ({ input }) => {
      return createToolMonitorHistory(input);
    }),
  updateToolMonitorHistory: publicProcedure
    .input(updateToolMonitorHistoryParams)
    .mutation(async ({ input }) => {
      return updateToolMonitorHistory(input.id, input);
    }),
  deleteToolMonitorHistory: publicProcedure
    .input(toolMonitorHistoryIdSchema)
    .mutation(async ({ input }) => {
      return deleteToolMonitorHistory(input.id);
    }),
});
