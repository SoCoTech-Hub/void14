import { getQuizaccessSebQuizSettingById, getQuizaccessSebQuizSettings } from "@/lib/api/quizaccessSebQuizSettings/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  quizaccessSebQuizSettingIdSchema,
  insertQuizaccessSebQuizSettingParams,
  updateQuizaccessSebQuizSettingParams,
} from "@/lib/db/schema/quizaccessSebQuizSettings";
import { createQuizaccessSebQuizSetting, deleteQuizaccessSebQuizSetting, updateQuizaccessSebQuizSetting } from "@/lib/api/quizaccessSebQuizSettings/mutations";

export const quizaccessSebQuizSettingsRouter = router({
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
