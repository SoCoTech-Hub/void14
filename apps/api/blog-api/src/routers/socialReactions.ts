import {
  insertSocialReactionParams,
  socialReactionIdSchema,
  updateSocialReactionParams,
} from "@soco/blog-db/schema/socialReactions";

import {
  createSocialReaction,
  deleteSocialReaction,
  updateSocialReaction,
} from "../api/socialReactions/mutations";
import {
  getSocialReactionById,
  getSocialReactions,
} from "../api/socialReactions/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const socialReactionsRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getSocialReactions: publicProcedure.query(async () => {
      return getSocialReactions();
    }),
    getSocialReactionById: publicProcedure
      .input(socialReactionIdSchema)
      .query(async ({ input }) => {
        return getSocialReactionById(input.id);
      }),
    createSocialReaction: publicProcedure
      .input(insertSocialReactionParams)
      .mutation(async ({ input }) => {
        return createSocialReaction(input);
      }),
    updateSocialReaction: publicProcedure
      .input(updateSocialReactionParams)
      .mutation(async ({ input }) => {
        return updateSocialReaction(input.id, input);
      }),
    deleteSocialReaction: publicProcedure
      .input(socialReactionIdSchema)
      .mutation(async ({ input }) => {
        return deleteSocialReaction(input.id);
      }),
  });
