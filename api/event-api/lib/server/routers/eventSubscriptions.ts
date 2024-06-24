import { getEventSubscriptionById, getEventSubscriptions } from "@/lib/api/eventSubscriptions/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  eventSubscriptionIdSchema,
  insertEventSubscriptionParams,
  updateEventSubscriptionParams,
} from "@/lib/db/schema/eventSubscriptions";
import { createEventSubscription, deleteEventSubscription, updateEventSubscription } from "@/lib/api/eventSubscriptions/mutations";

export const eventSubscriptionsRouter = router({
  getEventSubscriptions: publicProcedure.query(async () => {
    return getEventSubscriptions();
  }),
  getEventSubscriptionById: publicProcedure.input(eventSubscriptionIdSchema).query(async ({ input }) => {
    return getEventSubscriptionById(input.id);
  }),
  createEventSubscription: publicProcedure
    .input(insertEventSubscriptionParams)
    .mutation(async ({ input }) => {
      return createEventSubscription(input);
    }),
  updateEventSubscription: publicProcedure
    .input(updateEventSubscriptionParams)
    .mutation(async ({ input }) => {
      return updateEventSubscription(input.id, input);
    }),
  deleteEventSubscription: publicProcedure
    .input(eventSubscriptionIdSchema)
    .mutation(async ({ input }) => {
      return deleteEventSubscription(input.id);
    }),
});
