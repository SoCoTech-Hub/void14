import {
  competencyCourseCompSettingIdSchema,
  insertCompetencyCourseCompSettingParams,
  updateCompetencyCourseCompSettingParams,
} from "@soco/competency-db/schema/competencyCourseCompSettings";

import {
  createCompetencyCourseCompSetting,
  deleteCompetencyCourseCompSetting,
  updateCompetencyCourseCompSetting,
} from "../api/competencyCourseCompSettings/mutations";
import {
  getCompetencyCourseCompSettingById,
  getCompetencyCourseCompSettings,
} from "../api/competencyCourseCompSettings/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const competencyCourseCompSettingsRouter: ReturnType<
  typeof createTRPCRouter
> = createTRPCRouter({
  getCompetencyCourseCompSettings: publicProcedure.query(async () => {
    return getCompetencyCourseCompSettings();
  }),
  getCompetencyCourseCompSettingById: publicProcedure
    .input(competencyCourseCompSettingIdSchema)
    .query(async ({ input }) => {
      return getCompetencyCourseCompSettingById(input.id);
    }),
  createCompetencyCourseCompSetting: publicProcedure
    .input(insertCompetencyCourseCompSettingParams)
    .mutation(async ({ input }) => {
      return createCompetencyCourseCompSetting(input);
    }),
  updateCompetencyCourseCompSetting: publicProcedure
    .input(updateCompetencyCourseCompSettingParams)
    .mutation(async ({ input }) => {
      return updateCompetencyCourseCompSetting(input.id, input);
    }),
  deleteCompetencyCourseCompSetting: publicProcedure
    .input(competencyCourseCompSettingIdSchema)
    .mutation(async ({ input }) => {
      return deleteCompetencyCourseCompSetting(input.id);
    }),
});
