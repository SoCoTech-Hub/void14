import { getLocalizationLanguageById, getLocalizationLanguages } from "@/lib/api/localizationLanguages/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  localizationLanguageIdSchema,
  insertLocalizationLanguageParams,
  updateLocalizationLanguageParams,
} from "@/lib/db/schema/localizationLanguages";
import { createLocalizationLanguage, deleteLocalizationLanguage, updateLocalizationLanguage } from "@/lib/api/localizationLanguages/mutations";

export const localizationLanguagesRouter = router({
  getLocalizationLanguages: publicProcedure.query(async () => {
    return getLocalizationLanguages();
  }),
  getLocalizationLanguageById: publicProcedure.input(localizationLanguageIdSchema).query(async ({ input }) => {
    return getLocalizationLanguageById(input.id);
  }),
  createLocalizationLanguage: publicProcedure
    .input(insertLocalizationLanguageParams)
    .mutation(async ({ input }) => {
      return createLocalizationLanguage(input);
    }),
  updateLocalizationLanguage: publicProcedure
    .input(updateLocalizationLanguageParams)
    .mutation(async ({ input }) => {
      return updateLocalizationLanguage(input.id, input);
    }),
  deleteLocalizationLanguage: publicProcedure
    .input(localizationLanguageIdSchema)
    .mutation(async ({ input }) => {
      return deleteLocalizationLanguage(input.id);
    }),
});
