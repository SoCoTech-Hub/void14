import {
  createToolMonitorSubscription,
  deleteToolMonitorSubscription,
  updateToolMonitorSubscription,
} from "../api/toolMonitorSubscriptions/mutations";
import {
  getToolMonitorSubscriptionById,
  getToolMonitorSubscriptions,
} from "../api/toolMonitorSubscriptions/queries";
import {
  insertToolMonitorSubscriptionParams,
  toolMonitorSubscriptionIdSchema,
  updateToolMonitorSubscriptionParams,
} from "../db/schema/toolMonitorSubscriptions";
import { publicProcedure, router } from "../server/trpc";

export const toolMonitorSubscriptionsRouter = router({
  getToolMonitorSubscriptions: publicProcedure.query(async () => {
    return getToolMonitorSubscriptions();
  }),
  getToolMonitorSubscriptionById: publicProcedure
    .input(toolMonitorSubscriptionIdSchema)
    .query(async ({ input }) => {
      return getToolMonitorSubscriptionById(input.id);
    }),
  createToolMonitorSubscription: publicProcedure
    .input(insertToolMonitorSubscriptionParams)
    .mutation(async ({ input }) => {
      return createToolMonitorSubscription(input);
    }),
  updateToolMonitorSubscription: publicProcedure
    .input(updateToolMonitorSubscriptionParams)
    .mutation(async ({ input }) => {
      return updateToolMonitorSubscription(input.id, input);
    }),
  deleteToolMonitorSubscription: publicProcedure
    .input(toolMonitorSubscriptionIdSchema)
    .mutation(async ({ input }) => {
      return deleteToolMonitorSubscription(input.id);
    }),
});
