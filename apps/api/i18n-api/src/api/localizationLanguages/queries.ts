import { db } from "@soco/i18n-db/client";
import { eq } from "@soco/i18n-db";
import { type LocalizationLanguageId, localizationLanguageIdSchema, localizationLanguages } from "@soco/i18n-db/schema/localizationLanguages";

export const getLocalizationLanguages = async () => {
  const rows = await db.select().from(localizationLanguages);
  const l = rows
  return { localizationLanguages: l };
};

export const getLocalizationLanguageById = async (id: LocalizationLanguageId) => {
  const { id: localizationLanguageId } = localizationLanguageIdSchema.parse({ id });
  const [row] = await db.select().from(localizationLanguages).where(eq(localizationLanguages.id, localizationLanguageId));
  if (row === undefined) return {};
  const l = row;
  return { localizationLanguage: l };
};


