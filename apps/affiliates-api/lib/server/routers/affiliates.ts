import { getAffiliateById, getAffiliates } from "@/lib/api/affiliates/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  affiliateIdSchema,
  insertAffiliateParams,
  updateAffiliateParams,
} from "@/lib/db/schema/affiliates";
import { createAffiliate, deleteAffiliate, updateAffiliate } from "@/lib/api/affiliates/mutations";

export const affiliatesRouter = router({
  getAffiliates: publicProcedure.query(async () => {
    return getAffiliates();
  }),
  getAffiliateById: publicProcedure.input(affiliateIdSchema).query(async ({ input }) => {
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
