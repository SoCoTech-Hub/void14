import { getQuizaccessSebQuizSettingById, getQuizaccessSebQuizSettings } from "../api/quizaccessSebQuizSettings/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  quizaccessSebQuizSettingIdSchema,
  insertQuizaccessSebQuizSettingParams,
  updateQuizaccessSebQuizSettingParams,
} from "@soco/quizaccess-db/schema/quizaccessSebQuizSettings";
import { createQuizaccessSebQuizSetting, deleteQuizaccessSebQuizSetting, updateQuizaccessSebQuizSetting } from "../api/quizaccessSebQuizSettings/mutations";

export const quizaccessSebQuizSettingsRouter =createTRPCRouter({
  getQuizaccessSebQuizSettings: publicProcedure.query(async () => {
    return getQuizaccessSebQuizSettings();
  }),
  getQuizaccessSebQuizSettingById: publicProcedure.input(quizaccessSebQuizSettingIdSchema).query(async ({ input }) => {
    return getQuizaccessSebQuizSettingById(input.id);
  }),
  createQuizaccessSebQuizSetting: publicProcedure
    .input(insertQuizaccessSebQuizSettingParams)
    .mutation(async ({ input }) => {
      return createQuizaccessSebQuizSetting(input);
    }),
  updateQuizaccessSebQuizSetting: publicProcedure
    .input(updateQuizaccessSebQuizSettingParams)
    .mutation(async ({ input }) => {
      return updateQuizaccessSebQuizSetting(input.id, input);
    }),
  deleteQuizaccessSebQuizSetting: publicProcedure
    .input(quizaccessSebQuizSettingIdSchema)
    .mutation(async ({ input }) => {
      return deleteQuizaccessSebQuizSetting(input.id);
    }),
});
