import { getToolMonitorEventById, getToolMonitorEvents } from "@/lib/api/toolMonitorEvents/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  toolMonitorEventIdSchema,
  insertToolMonitorEventParams,
  updateToolMonitorEventParams,
} from "@/lib/db/schema/toolMonitorEvents";
import { createToolMonitorEvent, deleteToolMonitorEvent, updateToolMonitorEvent } from "@/lib/api/toolMonitorEvents/mutations";

export const toolMonitorEventsRouter = router({
  getToolMonitorEvents: publicProcedure.query(async () => {
    return getToolMonitorEvents();
  }),
  getToolMonitorEventById: publicProcedure.input(toolMonitorEventIdSchema).query(async ({ input }) => {
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
