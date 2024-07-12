import {
  insertLocalizationTranslationParams,
  localizationTranslationIdSchema,
  updateLocalizationTranslationParams,
} from "@soco/i18n-db/schema/localizationTranslations";

import {
  createLocalizationTranslation,
  deleteLocalizationTranslation,
  updateLocalizationTranslation,
} from "../api/localizationTranslations/mutations";
import {
  getLocalizationTranslationById,
  getLocalizationTranslations,
} from "../api/localizationTranslations/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const localizationTranslationsRouter: ReturnType<
  typeof createTRPCRouter
> = createTRPCRouter({
  getLocalizationTranslations: publicProcedure.query(async () => {
    return getLocalizationTranslations();
  }),
  getLocalizationTranslationById: publicProcedure
    .input(localizationTranslationIdSchema)
    .query(async ({ input }) => {
      return getLocalizationTranslationById(input.id);
    }),
  createLocalizationTranslation: publicProcedure
    .input(insertLocalizationTranslationParams)
    .mutation(async ({ input }) => {
      return createLocalizationTranslation(input);
    }),
  updateLocalizationTranslation: publicProcedure
    .input(updateLocalizationTranslationParams)
    .mutation(async ({ input }) => {
      return updateLocalizationTranslation(input.id, input);
    }),
  deleteLocalizationTranslation: publicProcedure
    .input(localizationTranslationIdSchema)
    .mutation(async ({ input }) => {
      return deleteLocalizationTranslation(input.id);
    }),
});
