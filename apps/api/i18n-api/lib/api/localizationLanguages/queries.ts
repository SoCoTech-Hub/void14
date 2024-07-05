import { eq } from "drizzle-orm";

import type { LocalizationLanguageId } from "../../db/schema/localizationLanguages";
import { db } from "../../db/index";
import {
  localizationLanguageIdSchema,
  localizationLanguages,
} from "../../db/schema/localizationLanguages";

export const getLocalizationLanguages = async () => {
  const rows = await db.select().from(localizationLanguages);
  const l = rows;
  return { localizationLanguages: l };
};

export const getLocalizationLanguageById = async (
  id: LocalizationLanguageId,
) => {
  const { id: localizationLanguageId } = localizationLanguageIdSchema.parse({
    id,
  });
  const [row] = await db
    .select()
    .from(localizationLanguages)
    .where(eq(localizationLanguages.id, localizationLanguageId));
  if (row === undefined) return {};
  const l = row;
  return { localizationLanguage: l };
};
