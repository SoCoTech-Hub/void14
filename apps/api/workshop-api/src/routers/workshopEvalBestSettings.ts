import { getWorkshopEvalBestSettingById, getWorkshopEvalBestSettings } from "../api/workshopEvalBestSettings/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  workshopEvalBestSettingIdSchema,
  insertWorkshopEvalBestSettingParams,
  updateWorkshopEvalBestSettingParams,
} from "@soco/workshop-db/schema/workshopEvalBestSettings";
import { createWorkshopEvalBestSetting, deleteWorkshopEvalBestSetting, updateWorkshopEvalBestSetting } from "../api/workshopEvalBestSettings/mutations";

export const workshopEvalBestSettingsRouter =createTRPCRouter({
  getWorkshopEvalBestSettings: publicProcedure.query(async () => {
    return getWorkshopEvalBestSettings();
  }),
  getWorkshopEvalBestSettingById: publicProcedure.input(workshopEvalBestSettingIdSchema).query(async ({ input }) => {
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
