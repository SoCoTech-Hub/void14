import { getSocialReactionById, getSocialReactions } from "@/lib/api/socialReactions/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  socialReactionIdSchema,
  insertSocialReactionParams,
  updateSocialReactionParams,
} from "@/lib/db/schema/socialReactions";
import { createSocialReaction, deleteSocialReaction, updateSocialReaction } from "@/lib/api/socialReactions/mutations";

export const socialReactionsRouter = router({
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
