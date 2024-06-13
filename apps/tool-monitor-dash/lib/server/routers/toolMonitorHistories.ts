import { getToolMonitorHistoryById, getToolMonitorHistories } from "@/lib/api/toolMonitorHistories/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  toolMonitorHistoryIdSchema,
  insertToolMonitorHistoryParams,
  updateToolMonitorHistoryParams,
} from "@/lib/db/schema/toolMonitorHistories";
import { createToolMonitorHistory, deleteToolMonitorHistory, updateToolMonitorHistory } from "@/lib/api/toolMonitorHistories/mutations";

export const toolMonitorHistoriesRouter = router({
  getToolMonitorHistories: publicProcedure.query(async () => {
    return getToolMonitorHistories();
  }),
  getToolMonitorHistoryById: publicProcedure.input(toolMonitorHistoryIdSchema).query(async ({ input }) => {
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
