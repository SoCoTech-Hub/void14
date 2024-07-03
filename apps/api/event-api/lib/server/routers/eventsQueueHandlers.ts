import { getEventsQueueHandlerById, getEventsQueueHandlers } from "@/lib/api/eventsQueueHandlers/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  eventsQueueHandlerIdSchema,
  insertEventsQueueHandlerParams,
  updateEventsQueueHandlerParams,
} from "@/lib/db/schema/eventsQueueHandlers";
import { createEventsQueueHandler, deleteEventsQueueHandler, updateEventsQueueHandler } from "@/lib/api/eventsQueueHandlers/mutations";

export const eventsQueueHandlersRouter = router({
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
