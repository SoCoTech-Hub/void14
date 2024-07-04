import {
  createAffiliatesDetail,
  deleteAffiliatesDetail,
  updateAffiliatesDetail,
} from "../api/affiliatesDetails/mutations";
import {
  getAffiliatesDetailById,
  getAffiliatesDetails,
} from "../api/affiliatesDetails/queries";
import {
  affiliatesDetailIdSchema,
  insertAffiliatesDetailParams,
  updateAffiliatesDetailParams,
} from "../db/schema/affiliatesDetails";
import { publicProcedure, router } from "../server/trpc";

export const affiliatesDetailsRouter = router({
  getAffiliatesDetails: publicProcedure.query(async () => {
    return getAffiliatesDetails();
  }),
  getAffiliatesDetailById: publicProcedure
    .input(affiliatesDetailIdSchema)
    .query(async ({ input }) => {
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
