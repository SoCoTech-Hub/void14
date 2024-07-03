import { getToolMonitorSubscriptionById, getToolMonitorSubscriptions } from "@/lib/api/toolMonitorSubscriptions/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  toolMonitorSubscriptionIdSchema,
  insertToolMonitorSubscriptionParams,
  updateToolMonitorSubscriptionParams,
} from "@/lib/db/schema/toolMonitorSubscriptions";
import { createToolMonitorSubscription, deleteToolMonitorSubscription, updateToolMonitorSubscription } from "@/lib/api/toolMonitorSubscriptions/mutations";

export const toolMonitorSubscriptionsRouter = router({
  getToolMonitorSubscriptions: publicProcedure.query(async () => {
    return getToolMonitorSubscriptions();
  }),
  getToolMonitorSubscriptionById: publicProcedure.input(toolMonitorSubscriptionIdSchema).query(async ({ input }) => {
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
