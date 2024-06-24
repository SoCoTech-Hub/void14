import { getSocialShareById, getSocialShares } from "@/lib/api/socialShares/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  socialShareIdSchema,
  insertSocialShareParams,
  updateSocialShareParams,
} from "@/lib/db/schema/socialShares";
import { createSocialShare, deleteSocialShare, updateSocialShare } from "@/lib/api/socialShares/mutations";

export const socialSharesRouter = router({
  getSocialShares: publicProcedure.query(async () => {
    return getSocialShares();
  }),
  getSocialShareById: publicProcedure.input(socialShareIdSchema).query(async ({ input }) => {
    return getSocialShareById(input.id);
  }),
  createSocialShare: publicProcedure
    .input(insertSocialShareParams)
    .mutation(async ({ input }) => {
      return createSocialShare(input);
    }),
  updateSocialShare: publicProcedure
    .input(updateSocialShareParams)
    .mutation(async ({ input }) => {
      return updateSocialShare(input.id, input);
    }),
  deleteSocialShare: publicProcedure
    .input(socialShareIdSchema)
    .mutation(async ({ input }) => {
      return deleteSocialShare(input.id);
    }),
});
