import {
  insertLocalizationLanguageParams,
  localizationLanguageIdSchema,
  updateLocalizationLanguageParams,
} from "@soco/i18n-db/schema/localizationLanguages";

import {
  createLocalizationLanguage,
  deleteLocalizationLanguage,
  updateLocalizationLanguage,
} from "../api/localizationLanguages/mutations";
import {
  getLocalizationLanguageById,
  getLocalizationLanguages,
} from "../api/localizationLanguages/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const localizationLanguagesRouter = createTRPCRouter({
  getLocalizationLanguages: publicProcedure.query(async () => {
    return getLocalizationLanguages();
  }),
  getLocalizationLanguageById: publicProcedure
    .input(localizationLanguageIdSchema)
    .query(async ({ input }) => {
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
