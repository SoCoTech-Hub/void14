import { getLtiToolSettingById, getLtiToolSettings } from "../api/ltiToolSettings/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  ltiToolSettingIdSchema,
  insertLtiToolSettingParams,
  updateLtiToolSettingParams,
} from "@soco/lti-db/schema/ltiToolSettings";
import { createLtiToolSetting, deleteLtiToolSetting, updateLtiToolSetting } from "../api/ltiToolSettings/mutations";

export const ltiToolSettingsRouter =createTRPCRouter({
  getLtiToolSettings: publicProcedure.query(async () => {
    return getLtiToolSettings();
  }),
  getLtiToolSettingById: publicProcedure.input(ltiToolSettingIdSchema).query(async ({ input }) => {
    return getLtiToolSettingById(input.id);
  }),
  createLtiToolSetting: publicProcedure
    .input(insertLtiToolSettingParams)
    .mutation(async ({ input }) => {
      return createLtiToolSetting(input);
    }),
  updateLtiToolSetting: publicProcedure
    .input(updateLtiToolSettingParams)
    .mutation(async ({ input }) => {
      return updateLtiToolSetting(input.id, input);
    }),
  deleteLtiToolSetting: publicProcedure
    .input(ltiToolSettingIdSchema)
    .mutation(async ({ input }) => {
      return deleteLtiToolSetting(input.id);
    }),
});
