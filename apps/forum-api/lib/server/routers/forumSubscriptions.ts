import { getForumSubscriptionById, getForumSubscriptions } from "@/lib/api/forumSubscriptions/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  forumSubscriptionIdSchema,
  insertForumSubscriptionParams,
  updateForumSubscriptionParams,
} from "@/lib/db/schema/forumSubscriptions";
import { createForumSubscription, deleteForumSubscription, updateForumSubscription } from "@/lib/api/forumSubscriptions/mutations";

export const forumSubscriptionsRouter = router({
  getForumSubscriptions: publicProcedure.query(async () => {
    return getForumSubscriptions();
  }),
  getForumSubscriptionById: publicProcedure.input(forumSubscriptionIdSchema).query(async ({ input }) => {
    return getForumSubscriptionById(input.id);
  }),
  createForumSubscription: publicProcedure
    .input(insertForumSubscriptionParams)
    .mutation(async ({ input }) => {
      return createForumSubscription(input);
    }),
  updateForumSubscription: publicProcedure
    .input(updateForumSubscriptionParams)
    .mutation(async ({ input }) => {
      return updateForumSubscription(input.id, input);
    }),
  deleteForumSubscription: publicProcedure
    .input(forumSubscriptionIdSchema)
    .mutation(async ({ input }) => {
      return deleteForumSubscription(input.id);
    }),
});
