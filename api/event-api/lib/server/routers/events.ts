import { getEventById, getEvents } from "@/lib/api/events/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  eventIdSchema,
  insertEventParams,
  updateEventParams,
} from "@/lib/db/schema/events";
import { createEvent, deleteEvent, updateEvent } from "@/lib/api/events/mutations";

export const eventsRouter = router({
  getEvents: publicProcedure.query(async () => {
    return getEvents();
  }),
  getEventById: publicProcedure.input(eventIdSchema).query(async ({ input }) => {
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
