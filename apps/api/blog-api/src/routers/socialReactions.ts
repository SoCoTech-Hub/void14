import { getSocialReactionById, getSocialReactions } from "../api/socialReactions/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  socialReactionIdSchema,
  insertSocialReactionParams,
  updateSocialReactionParams,
} from "@soco/blog-db/schema/socialReactions";
import { createSocialReaction, deleteSocialReaction, updateSocialReaction } from "../api/socialReactions/mutations";

export const socialReactionsRouter =createTRPCRouter({
  getSocialReactions: publicProcedure.query(async () => {
    return getSocialReactions();
  }),
  getSocialReactionById: publicProcedure.input(socialReactionIdSchema).query(async ({ input }) => {
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
