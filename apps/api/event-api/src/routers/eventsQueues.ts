import { getEventsQueueById, getEventsQueues } from "../api/eventsQueues/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  eventsQueueIdSchema,
  insertEventsQueueParams,
  updateEventsQueueParams,
} from "@soco/event-db/schema/eventsQueues";
import { createEventsQueue, deleteEventsQueue, updateEventsQueue } from "../api/eventsQueues/mutations";

export const eventsQueuesRouter =createTRPCRouter({
  getEventsQueues: publicProcedure.query(async () => {
    return getEventsQueues();
  }),
  getEventsQueueById: publicProcedure.input(eventsQueueIdSchema).query(async ({ input }) => {
    return getEventsQueueById(input.id);
  }),
  createEventsQueue: publicProcedure
    .input(insertEventsQueueParams)
    .mutation(async ({ input }) => {
      return createEventsQueue(input);
    }),
  updateEventsQueue: publicProcedure
    .input(updateEventsQueueParams)
    .mutation(async ({ input }) => {
      return updateEventsQueue(input.id, input);
    }),
  deleteEventsQueue: publicProcedure
    .input(eventsQueueIdSchema)
    .mutation(async ({ input }) => {
      return deleteEventsQueue(input.id);
    }),
});
