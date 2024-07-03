import { getEventResponseById, getEventResponses } from "@/lib/api/eventResponses/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  eventResponseIdSchema,
  insertEventResponseParams,
  updateEventResponseParams,
} from "@/lib/db/schema/eventResponses";
import { createEventResponse, deleteEventResponse, updateEventResponse } from "@/lib/api/eventResponses/mutations";

export const eventResponsesRouter = router({
  getEventResponses: publicProcedure.query(async () => {
    return getEventResponses();
  }),
  getEventResponseById: publicProcedure.input(eventResponseIdSchema).query(async ({ input }) => {
    return getEventResponseById(input.id);
  }),
  createEventResponse: publicProcedure
    .input(insertEventResponseParams)
    .mutation(async ({ input }) => {
      return createEventResponse(input);
    }),
  updateEventResponse: publicProcedure
    .input(updateEventResponseParams)
    .mutation(async ({ input }) => {
      return updateEventResponse(input.id, input);
    }),
  deleteEventResponse: publicProcedure
    .input(eventResponseIdSchema)
    .mutation(async ({ input }) => {
      return deleteEventResponse(input.id);
    }),
});
