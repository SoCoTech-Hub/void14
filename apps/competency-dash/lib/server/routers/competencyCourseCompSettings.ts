import { getCompetencyCourseCompSettingById, getCompetencyCourseCompSettings } from "@/lib/api/competencyCourseCompSettings/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  competencyCourseCompSettingIdSchema,
  insertCompetencyCourseCompSettingParams,
  updateCompetencyCourseCompSettingParams,
} from "@/lib/db/schema/competencyCourseCompSettings";
import { createCompetencyCourseCompSetting, deleteCompetencyCourseCompSetting, updateCompetencyCourseCompSetting } from "@/lib/api/competencyCourseCompSettings/mutations";

export const competencyCourseCompSettingsRouter = router({
  getCompetencyCourseCompSettings: publicProcedure.query(async () => {
    return getCompetencyCourseCompSettings();
  }),
  getCompetencyCourseCompSettingById: publicProcedure.input(competencyCourseCompSettingIdSchema).query(async ({ input }) => {
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
