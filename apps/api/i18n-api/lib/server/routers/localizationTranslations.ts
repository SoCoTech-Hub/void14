import {
  createLocalizationTranslation,
  deleteLocalizationTranslation,
  updateLocalizationTranslation,
} from "../api/localizationTranslations/mutations";
import {
  getLocalizationTranslationById,
  getLocalizationTranslations,
} from "../api/localizationTranslations/queries";
import {
  insertLocalizationTranslationParams,
  localizationTranslationIdSchema,
  updateLocalizationTranslationParams,
} from "../db/schema/localizationTranslations";
import { publicProcedure, router } from "../server/trpc";

export const localizationTranslationsRouter = router({
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
