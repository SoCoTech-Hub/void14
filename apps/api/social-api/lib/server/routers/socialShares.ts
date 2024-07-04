import {
  createSocialShare,
  deleteSocialShare,
  updateSocialShare,
} from "../api/socialShares/mutations";
import {
  getSocialShareById,
  getSocialShares,
} from "../api/socialShares/queries";
import {
  insertSocialShareParams,
  socialShareIdSchema,
  updateSocialShareParams,
} from "../db/schema/socialShares";
import { publicProcedure, router } from "../server/trpc";

export const socialSharesRouter = router({
  getSocialShares: publicProcedure.query(async () => {
    return getSocialShares();
  }),
  getSocialShareById: publicProcedure
    .input(socialShareIdSchema)
    .query(async ({ input }) => {
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
