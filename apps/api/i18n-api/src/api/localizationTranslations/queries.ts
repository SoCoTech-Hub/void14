import { db } from "@soco/i18n-db/client";
import { eq } from "@soco/i18n-db";
import { type LocalizationTranslationId, localizationTranslationIdSchema, localizationTranslations } from "@soco/i18n-db/schema/localizationTranslations";
import { localizationFields } from "@soco/i18n-db/schema/localizationFields";
import { localizationLanguages } from "@soco/i18n-db/schema/localizationLanguages";

export const getLocalizationTranslations = async () => {
  const rows = await db.select({ localizationTranslation: localizationTranslations, localizationField: localizationFields, localizationLanguage: localizationLanguages }).from(localizationTranslations).leftJoin(localizationFields, eq(localizationTranslations.localizationFieldId, localizationFields.id)).leftJoin(localizationLanguages, eq(localizationTranslations.localizationLanguageId, localizationLanguages.id));
  const l = rows .map((r) => ({ ...r.localizationTranslation, localizationField: r.localizationField, localizationLanguage: r.localizationLanguage})); 
  return { localizationTranslations: l };
};

export const getLocalizationTranslationById = async (id: LocalizationTranslationId) => {
  const { id: localizationTranslationId } = localizationTranslationIdSchema.parse({ id });
  const [row] = await db.select({ localizationTranslation: localizationTranslations, localizationField: localizationFields, localizationLanguage: localizationLanguages }).from(localizationTranslations).where(eq(localizationTranslations.id, localizationTranslationId)).leftJoin(localizationFields, eq(localizationTranslations.localizationFieldId, localizationFields.id)).leftJoin(localizationLanguages, eq(localizationTranslations.localizationLanguageId, localizationLanguages.id));
  if (row === undefined) return {};
  const l =  { ...row.localizationTranslation, localizationField: row.localizationField, localizationLanguage: row.localizationLanguage } ;
  return { localizationTranslation: l };
};


