import {
  eventsHandlerIdSchema,
  insertEventsHandlerParams,
  updateEventsHandlerParams,
} from "@soco/event-db/schema/eventsHandlers";

import {
  createEventsHandler,
  deleteEventsHandler,
  updateEventsHandler,
} from "../api/eventsHandlers/mutations";
import {
  getEventsHandlerById,
  getEventsHandlers,
} from "../api/eventsHandlers/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const eventsHandlersRouter = createTRPCRouter({
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
