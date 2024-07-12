import {
  forumSubscriptionIdSchema,
  insertForumSubscriptionParams,
  updateForumSubscriptionParams,
} from "@soco/forum-db/schema/forumSubscriptions";

import {
  createForumSubscription,
  deleteForumSubscription,
  updateForumSubscription,
} from "../api/forumSubscriptions/mutations";
import {
  getForumSubscriptionById,
  getForumSubscriptions,
} from "../api/forumSubscriptions/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const forumSubscriptionsRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
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
