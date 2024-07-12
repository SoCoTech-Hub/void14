import {
  insertToolMonitorHistoryParams,
  toolMonitorHistoryIdSchema,
  updateToolMonitorHistoryParams,
} from "@soco/tool-monitor-db/schema/toolMonitorHistories";

import {
  createToolMonitorHistory,
  deleteToolMonitorHistory,
  updateToolMonitorHistory,
} from "../api/toolMonitorHistories/mutations";
import {
  getToolMonitorHistories,
  getToolMonitorHistoryById,
} from "../api/toolMonitorHistories/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const toolMonitorHistoriesRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
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
