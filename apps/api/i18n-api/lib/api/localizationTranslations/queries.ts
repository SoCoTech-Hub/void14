import { eq } from "drizzle-orm";

import type { LocalizationTranslationId } from "../db/schema/localizationTranslations";
import { db } from "../db/index";
import { localizationFields } from "../db/schema/localizationFields";
import { localizationLanguages } from "../db/schema/localizationLanguages";
import {
  localizationTranslationIdSchema,
  localizationTranslations,
} from "../db/schema/localizationTranslations";

export const getLocalizationTranslations = async () => {
  const rows = await db
    .select({
      localizationTranslation: localizationTranslations,
      localizationField: localizationFields,
      localizationLanguage: localizationLanguages,
    })
    .from(localizationTranslations)
    .leftJoin(
      localizationFields,
      eq(localizationTranslations.localizationFieldId, localizationFields.id),
    )
    .leftJoin(
      localizationLanguages,
      eq(
        localizationTranslations.localizationLanguageId,
        localizationLanguages.id,
      ),
    );
  const l = rows.map((r) => ({
    ...r.localizationTranslation,
    localizationField: r.localizationField,
    localizationLanguage: r.localizationLanguage,
  }));
  return { localizationTranslations: l };
};

export const getLocalizationTranslationById = async (
  id: LocalizationTranslationId,
) => {
  const { id: localizationTranslationId } =
    localizationTranslationIdSchema.parse({ id });
  const [row] = await db
    .select({
      localizationTranslation: localizationTranslations,
      localizationField: localizationFields,
      localizationLanguage: localizationLanguages,
    })
    .from(localizationTranslations)
    .where(eq(localizationTranslations.id, localizationTranslationId))
    .leftJoin(
      localizationFields,
      eq(localizationTranslations.localizationFieldId, localizationFields.id),
    )
    .leftJoin(
      localizationLanguages,
      eq(
        localizationTranslations.localizationLanguageId,
        localizationLanguages.id,
      ),
    );
  if (row === undefined) return {};
  const l = {
    ...row.localizationTranslation,
    localizationField: row.localizationField,
    localizationLanguage: row.localizationLanguage,
  };
  return { localizationTranslation: l };
};
