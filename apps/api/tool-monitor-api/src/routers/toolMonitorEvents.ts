import {
  insertToolMonitorEventParams,
  toolMonitorEventIdSchema,
  updateToolMonitorEventParams,
} from "@soco/tool-monitor-db/schema/toolMonitorEvents";

import {
  createToolMonitorEvent,
  deleteToolMonitorEvent,
  updateToolMonitorEvent,
} from "../api/toolMonitorEvents/mutations";
import {
  getToolMonitorEventById,
  getToolMonitorEvents,
} from "../api/toolMonitorEvents/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const toolMonitorEventsRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getToolMonitorEvents: publicProcedure.query(async () => {
      return getToolMonitorEvents();
    }),
    getToolMonitorEventById: publicProcedure
      .input(toolMonitorEventIdSchema)
      .query(async ({ input }) => {
        return getToolMonitorEventById(input.id);
      }),
    createToolMonitorEvent: publicProcedure
      .input(insertToolMonitorEventParams)
      .mutation(async ({ input }) => {
        return createToolMonitorEvent(input);
      }),
    updateToolMonitorEvent: publicProcedure
      .input(updateToolMonitorEventParams)
      .mutation(async ({ input }) => {
        return updateToolMonitorEvent(input.id, input);
      }),
    deleteToolMonitorEvent: publicProcedure
      .input(toolMonitorEventIdSchema)
      .mutation(async ({ input }) => {
        return deleteToolMonitorEvent(input.id);
      }),
  });
