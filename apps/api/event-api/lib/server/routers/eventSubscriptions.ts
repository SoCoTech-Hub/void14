import {
  createEventSubscription,
  deleteEventSubscription,
  updateEventSubscription,
} from "../api/eventSubscriptions/mutations";
import {
  getEventSubscriptionById,
  getEventSubscriptions,
} from "../api/eventSubscriptions/queries";
import {
  eventSubscriptionIdSchema,
  insertEventSubscriptionParams,
  updateEventSubscriptionParams,
} from "../db/schema/eventSubscriptions";
import { publicProcedure, router } from "../server/trpc";

export const eventSubscriptionsRouter = router({
  getEventSubscriptions: publicProcedure.query(async () => {
    return getEventSubscriptions();
  }),
  getEventSubscriptionById: publicProcedure
    .input(eventSubscriptionIdSchema)
    .query(async ({ input }) => {
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
