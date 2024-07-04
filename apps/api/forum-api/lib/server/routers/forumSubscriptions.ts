import {
  createForumSubscription,
  deleteForumSubscription,
  updateForumSubscription,
} from "../api/forumSubscriptions/mutations";
import {
  getForumSubscriptionById,
  getForumSubscriptions,
} from "../api/forumSubscriptions/queries";
import {
  forumSubscriptionIdSchema,
  insertForumSubscriptionParams,
  updateForumSubscriptionParams,
} from "../db/schema/forumSubscriptions";
import { publicProcedure, router } from "../server/trpc";

export const forumSubscriptionsRouter = router({
  getForumSubscriptions: publicProcedure.query(async () => {
    return getForumSubscriptions();
  }),
  getForumSubscriptionById: publicProcedure
    .input(forumSubscriptionIdSchema)
    .query(async ({ input }) => {
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
