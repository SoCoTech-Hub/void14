import { db } from "@soco/i18n-db/client";
import { eq } from "@soco/i18n-db";
import { 
  type LocalizationTranslationId, 
  type NewLocalizationTranslationParams,
  type UpdateLocalizationTranslationParams, 
  updateLocalizationTranslationSchema,
  insertLocalizationTranslationSchema, 
  localizationTranslations,
  localizationTranslationIdSchema 
} from "@soco/i18n-db/schema/localizationTranslations";

export const createLocalizationTranslation = async (localizationTranslation: NewLocalizationTranslationParams) => {
  const newLocalizationTranslation = insertLocalizationTranslationSchema.parse(localizationTranslation);
  try {
    const [l] =  await db.insert(localizationTranslations).values(newLocalizationTranslation).returning();
    return { localizationTranslation: l };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateLocalizationTranslation = async (id: LocalizationTranslationId, localizationTranslation: UpdateLocalizationTranslationParams) => {
  const { id: localizationTranslationId } = localizationTranslationIdSchema.parse({ id });
  const newLocalizationTranslation = updateLocalizationTranslationSchema.parse(localizationTranslation);
  try {
    const [l] =  await db
     .update(localizationTranslations)
     .set(newLocalizationTranslation)
     .where(eq(localizationTranslations.id, localizationTranslationId!))
     .returning();
    return { localizationTranslation: l };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteLocalizationTranslation = async (id: LocalizationTranslationId) => {
  const { id: localizationTranslationId } = localizationTranslationIdSchema.parse({ id });
  try {
    const [l] =  await db.delete(localizationTranslations).where(eq(localizationTranslations.id, localizationTranslationId!))
    .returning();
    return { localizationTranslation: l };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

