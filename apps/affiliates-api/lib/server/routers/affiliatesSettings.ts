import { getAffiliatesSettingById, getAffiliatesSettings } from "@/lib/api/affiliatesSettings/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  affiliatesSettingIdSchema,
  insertAffiliatesSettingParams,
  updateAffiliatesSettingParams,
} from "@/lib/db/schema/affiliatesSettings";
import { createAffiliatesSetting, deleteAffiliatesSetting, updateAffiliatesSetting } from "@/lib/api/affiliatesSettings/mutations";

export const affiliatesSettingsRouter = router({
  getAffiliatesSettings: publicProcedure.query(async () => {
    return getAffiliatesSettings();
  }),
  getAffiliatesSettingById: publicProcedure.input(affiliatesSettingIdSchema).query(async ({ input }) => {
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
