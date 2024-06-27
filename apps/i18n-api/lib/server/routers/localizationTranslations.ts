import { getLocalizationTranslationById, getLocalizationTranslations } from "@/lib/api/localizationTranslations/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  localizationTranslationIdSchema,
  insertLocalizationTranslationParams,
  updateLocalizationTranslationParams,
} from "@/lib/db/schema/localizationTranslations";
import { createLocalizationTranslation, deleteLocalizationTranslation, updateLocalizationTranslation } from "@/lib/api/localizationTranslations/mutations";

export const localizationTranslationsRouter = router({
  getLocalizationTranslations: publicProcedure.query(async () => {
    return getLocalizationTranslations();
  }),
  getLocalizationTranslationById: publicProcedure.input(localizationTranslationIdSchema).query(async ({ input }) => {
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
