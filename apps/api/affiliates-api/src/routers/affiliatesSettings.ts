import {
  affiliatesSettingIdSchema,
  insertAffiliatesSettingParams,
  updateAffiliatesSettingParams,
} from "@soco/affiliates-db/schema/affiliatesSettings";

import {
  createAffiliatesSetting,
  deleteAffiliatesSetting,
  updateAffiliatesSetting,
} from "../api/affiliatesSettings/mutations";
import {
  getAffiliatesSettingById,
  getAffiliatesSettings,
} from "../api/affiliatesSettings/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const affiliatesSettingsRouter = createTRPCRouter({
  getAffiliatesSettings: publicProcedure.query(async () => {
    return getAffiliatesSettings();
  }),
  getAffiliatesSettingById: publicProcedure
    .input(affiliatesSettingIdSchema)
    .query(async ({ input }) => {
      return getAffiliatesSettingById(input.id);
    }),
  createAffiliatesSetting: publicProcedure
    .input(insertAffiliatesSettingParams)
    .mutation(async ({ input }) => {
      return createAffiliatesSetting(input);
    }),
  updateAffiliatesSetting: publicProcedure
    .input(updateAffiliatesSettingParams)
    .mutation(async ({ input }) => {
      return updateAffiliatesSetting(input.id, input);
    }),
  deleteAffiliatesSetting: publicProcedure
    .input(affiliatesSettingIdSchema)
    .mutation(async ({ input }) => {
      return deleteAffiliatesSetting(input.id);
    }),
});
