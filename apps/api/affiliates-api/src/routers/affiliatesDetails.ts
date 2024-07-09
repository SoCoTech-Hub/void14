import {
  affiliatesDetailIdSchema,
  insertAffiliatesDetailParams,
  updateAffiliatesDetailParams,
} from "@soco/affiliates-db/schema/affiliatesDetails";

import {
  createAffiliatesDetail,
  deleteAffiliatesDetail,
  updateAffiliatesDetail,
} from "../api/affiliatesDetails/mutations";
import {
  getAffiliatesDetailById,
  getAffiliatesDetails,
} from "../api/affiliatesDetails/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const affiliatesDetailsRouter = createTRPCRouter({
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
