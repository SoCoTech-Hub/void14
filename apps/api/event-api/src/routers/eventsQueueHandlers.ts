import { getEventsQueueHandlerById, getEventsQueueHandlers } from "../api/eventsQueueHandlers/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  eventsQueueHandlerIdSchema,
  insertEventsQueueHandlerParams,
  updateEventsQueueHandlerParams,
} from "@soco/event-db/schema/eventsQueueHandlers";
import { createEventsQueueHandler, deleteEventsQueueHandler, updateEventsQueueHandler } from "../api/eventsQueueHandlers/mutations";

export const eventsQueueHandlersRouter =createTRPCRouter({
  getEventsQueueHandlers: publicProcedure.query(async () => {
    return getEventsQueueHandlers();
  }),
  getEventsQueueHandlerById: publicProcedure.input(eventsQueueHandlerIdSchema).query(async ({ input }) => {
    return getEventsQueueHandlerById(input.id);
  }),
  createEventsQueueHandler: publicProcedure
    .input(insertEventsQueueHandlerParams)
    .mutation(async ({ input }) => {
      return createEventsQueueHandler(input);
    }),
  updateEventsQueueHandler: publicProcedure
    .input(updateEventsQueueHandlerParams)
    .mutation(async ({ input }) => {
      return updateEventsQueueHandler(input.id, input);
    }),
  deleteEventsQueueHandler: publicProcedure
    .input(eventsQueueHandlerIdSchema)
    .mutation(async ({ input }) => {
      return deleteEventsQueueHandler(input.id);
    }),
});
