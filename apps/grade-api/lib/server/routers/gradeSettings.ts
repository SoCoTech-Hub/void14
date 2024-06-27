import { getGradeSettingById, getGradeSettings } from "@/lib/api/gradeSettings/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  gradeSettingIdSchema,
  insertGradeSettingParams,
  updateGradeSettingParams,
} from "@/lib/db/schema/gradeSettings";
import { createGradeSetting, deleteGradeSetting, updateGradeSetting } from "@/lib/api/gradeSettings/mutations";

export const gradeSettingsRouter = router({
  getGradeSettings: publicProcedure.query(async () => {
    return getGradeSettings();
  }),
  getGradeSettingById: publicProcedure.input(gradeSettingIdSchema).query(async ({ input }) => {
    return getGradeSettingById(input.id);
  }),
  createGradeSetting: publicProcedure
    .input(insertGradeSettingParams)
    .mutation(async ({ input }) => {
      return createGradeSetting(input);
    }),
  updateGradeSetting: publicProcedure
    .input(updateGradeSettingParams)
    .mutation(async ({ input }) => {
      return updateGradeSetting(input.id, input);
    }),
  deleteGradeSetting: publicProcedure
    .input(gradeSettingIdSchema)
    .mutation(async ({ input }) => {
      return deleteGradeSetting(input.id);
    }),
});
