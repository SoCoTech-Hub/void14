import { getForumSubscriptionById, getForumSubscriptions } from "../api/forumSubscriptions/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  forumSubscriptionIdSchema,
  insertForumSubscriptionParams,
  updateForumSubscriptionParams,
} from "@soco/forum-db/schema/forumSubscriptions";
import { createForumSubscription, deleteForumSubscription, updateForumSubscription } from "../api/forumSubscriptions/mutations";

export const forumSubscriptionsRouter =createTRPCRouter({
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
