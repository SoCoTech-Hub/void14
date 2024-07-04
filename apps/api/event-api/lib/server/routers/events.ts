import { createEvent, deleteEvent, updateEvent } from "../api/events/mutations";
import { getEventById, getEvents } from "../api/events/queries";
import {
  eventIdSchema,
  insertEventParams,
  updateEventParams,
} from "../db/schema/events";
import { publicProcedure, router } from "../server/trpc";

export const eventsRouter = router({
  getEvents: publicProcedure.query(async () => {
    return getEvents();
  }),
  getEventById: publicProcedure
    .input(eventIdSchema)
    .query(async ({ input }) => {
      return getEventById(input.id);
    }),
  createEvent: publicProcedure
    .input(insertEventParams)
    .mutation(async ({ input }) => {
      return createEvent(input);
    }),
  updateEvent: publicProcedure
    .input(updateEventParams)
    .mutation(async ({ input }) => {
      return updateEvent(input.id, input);
    }),
  deleteEvent: publicProcedure
    .input(eventIdSchema)
    .mutation(async ({ input }) => {
      return deleteEvent(input.id);
    }),
});
