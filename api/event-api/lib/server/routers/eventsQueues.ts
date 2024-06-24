import { getEventsQueueById, getEventsQueues } from "@/lib/api/eventsQueues/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  eventsQueueIdSchema,
  insertEventsQueueParams,
  updateEventsQueueParams,
} from "@/lib/db/schema/eventsQueues";
import { createEventsQueue, deleteEventsQueue, updateEventsQueue } from "@/lib/api/eventsQueues/mutations";

export const eventsQueuesRouter = router({
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
