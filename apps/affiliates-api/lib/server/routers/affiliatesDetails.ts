import { getAffiliatesDetailById, getAffiliatesDetails } from "@/lib/api/affiliatesDetails/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  affiliatesDetailIdSchema,
  insertAffiliatesDetailParams,
  updateAffiliatesDetailParams,
} from "@/lib/db/schema/affiliatesDetails";
import { createAffiliatesDetail, deleteAffiliatesDetail, updateAffiliatesDetail } from "@/lib/api/affiliatesDetails/mutations";

export const affiliatesDetailsRouter = router({
  getAffiliatesDetails: publicProcedure.query(async () => {
    return getAffiliatesDetails();
  }),
  getAffiliatesDetailById: publicProcedure.input(affiliatesDetailIdSchema).query(async ({ input }) => {
    return getAffiliatesDetailById(input.id);
  }),
  createAffiliatesDetail: publicProcedure
    .input(insertAffiliatesDetailParams)
    .mutation(async ({ input }) => {
      return createAffiliatesDetail(input);
    }),
  updateAffiliatesDetail: publicProcedure
    .input(updateAffiliatesDetailParams)
    .mutation(async ({ input }) => {
      return updateAffiliatesDetail(input.id, input);
    }),
  deleteAffiliatesDetail: publicProcedure
    .input(affiliatesDetailIdSchema)
    .mutation(async ({ input }) => {
      return deleteAffiliatesDetail(input.id);
    }),
});
