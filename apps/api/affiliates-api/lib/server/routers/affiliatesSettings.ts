import {
  createAffiliatesSetting,
  deleteAffiliatesSetting,
  updateAffiliatesSetting,
} from "../api/affiliatesSettings/mutations";
import {
  getAffiliatesSettingById,
  getAffiliatesSettings,
} from "../api/affiliatesSettings/queries";
import {
  affiliatesSettingIdSchema,
  insertAffiliatesSettingParams,
  updateAffiliatesSettingParams,
} from "../db/schema/affiliatesSettings";
import { publicProcedure, router } from "../server/trpc";

export const affiliatesSettingsRouter = router({
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
