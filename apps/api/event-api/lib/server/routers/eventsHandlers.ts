import {
  createEventsHandler,
  deleteEventsHandler,
  updateEventsHandler,
} from "../api/eventsHandlers/mutations";
import {
  getEventsHandlerById,
  getEventsHandlers,
} from "../api/eventsHandlers/queries";
import {
  eventsHandlerIdSchema,
  insertEventsHandlerParams,
  updateEventsHandlerParams,
} from "../db/schema/eventsHandlers";
import { publicProcedure, router } from "../server/trpc";

export const eventsHandlersRouter = router({
  getEventsHandlers: publicProcedure.query(async () => {
    return getEventsHandlers();
  }),
  getEventsHandlerById: publicProcedure
    .input(eventsHandlerIdSchema)
    .query(async ({ input }) => {
      return getEventsHandlerById(input.id);
    }),
  createEventsHandler: publicProcedure
    .input(insertEventsHandlerParams)
    .mutation(async ({ input }) => {
      return createEventsHandler(input);
    }),
  updateEventsHandler: publicProcedure
    .input(updateEventsHandlerParams)
    .mutation(async ({ input }) => {
      return updateEventsHandler(input.id, input);
    }),
  deleteEventsHandler: publicProcedure
    .input(eventsHandlerIdSchema)
    .mutation(async ({ input }) => {
      return deleteEventsHandler(input.id);
    }),
});
