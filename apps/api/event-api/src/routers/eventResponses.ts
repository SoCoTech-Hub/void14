import {
  eventResponseIdSchema,
  insertEventResponseParams,
  updateEventResponseParams,
} from "@soco/event-db/schema/eventResponses";

import {
  createEventResponse,
  deleteEventResponse,
  updateEventResponse,
} from "../api/eventResponses/mutations";
import {
  getEventResponseById,
  getEventResponses,
} from "../api/eventResponses/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const eventResponsesRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getEventResponses: publicProcedure.query(async () => {
      return getEventResponses();
    }),
    getEventResponseById: publicProcedure
      .input(eventResponseIdSchema)
      .query(async ({ input }) => {
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
