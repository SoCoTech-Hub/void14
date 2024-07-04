import {
  createWorkshopEvalBestSetting,
  deleteWorkshopEvalBestSetting,
  updateWorkshopEvalBestSetting,
} from "../api/workshopEvalBestSettings/mutations";
import {
  getWorkshopEvalBestSettingById,
  getWorkshopEvalBestSettings,
} from "../api/workshopEvalBestSettings/queries";
import {
  insertWorkshopEvalBestSettingParams,
  updateWorkshopEvalBestSettingParams,
  workshopEvalBestSettingIdSchema,
} from "../db/schema/workshopEvalBestSettings";
import { publicProcedure, router } from "../server/trpc";

export const workshopEvalBestSettingsRouter = router({
  getWorkshopEvalBestSettings: publicProcedure.query(async () => {
    return getWorkshopEvalBestSettings();
  }),
  getWorkshopEvalBestSettingById: publicProcedure
    .input(workshopEvalBestSettingIdSchema)
    .query(async ({ input }) => {
      return getWorkshopEvalBestSettingById(input.id);
    }),
  createWorkshopEvalBestSetting: publicProcedure
    .input(insertWorkshopEvalBestSettingParams)
    .mutation(async ({ input }) => {
      return createWorkshopEvalBestSetting(input);
    }),
  updateWorkshopEvalBestSetting: publicProcedure
    .input(updateWorkshopEvalBestSettingParams)
    .mutation(async ({ input }) => {
      return updateWorkshopEvalBestSetting(input.id, input);
    }),
  deleteWorkshopEvalBestSetting: publicProcedure
    .input(workshopEvalBestSettingIdSchema)
    .mutation(async ({ input }) => {
      return deleteWorkshopEvalBestSetting(input.id);
    }),
});
