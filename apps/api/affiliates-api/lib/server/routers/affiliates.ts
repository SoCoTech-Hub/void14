import {
  createAffiliate,
  deleteAffiliate,
  updateAffiliate,
} from "../api/affiliates/mutations";
import { getAffiliateById, getAffiliates } from "../api/affiliates/queries";
import {
  affiliateIdSchema,
  insertAffiliateParams,
  updateAffiliateParams,
} from "../db/schema/affiliates";
import { publicProcedure, router } from "../server/trpc";

export const affiliatesRouter = router({
  getAffiliates: publicProcedure.query(async () => {
    return getAffiliates();
  }),
  getAffiliateById: publicProcedure
    .input(affiliateIdSchema)
    .query(async ({ input }) => {
      return getAffiliateById(input.id);
    }),
  createAffiliate: publicProcedure
    .input(insertAffiliateParams)
    .mutation(async ({ input }) => {
      return createAffiliate(input);
    }),
  updateAffiliate: publicProcedure
    .input(updateAffiliateParams)
    .mutation(async ({ input }) => {
      return updateAffiliate(input.id, input);
    }),
  deleteAffiliate: publicProcedure
    .input(affiliateIdSchema)
    .mutation(async ({ input }) => {
      return deleteAffiliate(input.id);
    }),
});
