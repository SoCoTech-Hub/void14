import { getEventsHandlerById, getEventsHandlers } from "@/lib/api/eventsHandlers/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  eventsHandlerIdSchema,
  insertEventsHandlerParams,
  updateEventsHandlerParams,
} from "@/lib/db/schema/eventsHandlers";
import { createEventsHandler, deleteEventsHandler, updateEventsHandler } from "@/lib/api/eventsHandlers/mutations";

export const eventsHandlersRouter = router({
  getEventsHandlers: publicProcedure.query(async () => {
    return getEventsHandlers();
  }),
  getEventsHandlerById: publicProcedure.input(eventsHandlerIdSchema).query(async ({ input }) => {
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
