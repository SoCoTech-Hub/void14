import {
  gradeSettingIdSchema,
  insertGradeSettingParams,
  updateGradeSettingParams,
} from "@soco/grade-db/schema/gradeSettings";

import {
  createGradeSetting,
  deleteGradeSetting,
  updateGradeSetting,
} from "../api/gradeSettings/mutations";
import {
  getGradeSettingById,
  getGradeSettings,
} from "../api/gradeSettings/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const gradeSettingsRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getGradeSettings: publicProcedure.query(async () => {
      return getGradeSettings();
    }),
    getGradeSettingById: publicProcedure
      .input(gradeSettingIdSchema)
      .query(async ({ input }) => {
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
