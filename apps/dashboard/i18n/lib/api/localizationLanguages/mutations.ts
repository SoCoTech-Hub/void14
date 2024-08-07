import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  type LocalizationLanguageId, 
  type NewLocalizationLanguageParams,
  type UpdateLocalizationLanguageParams, 
  updateLocalizationLanguageSchema,
  insertLocalizationLanguageSchema, 
  localizationLanguages,
  localizationLanguageIdSchema 
} from "@/lib/db/schema/localizationLanguages";

export const createLocalizationLanguage = async (localizationLanguage: NewLocalizationLanguageParams) => {
  const newLocalizationLanguage = insertLocalizationLanguageSchema.parse(localizationLanguage);
  try {
    const [l] =  await db.insert(localizationLanguages).values(newLocalizationLanguage).returning();
    return { localizationLanguage: l };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateLocalizationLanguage = async (id: LocalizationLanguageId, localizationLanguage: UpdateLocalizationLanguageParams) => {
  const { id: localizationLanguageId } = localizationLanguageIdSchema.parse({ id });
  const newLocalizationLanguage = updateLocalizationLanguageSchema.parse(localizationLanguage);
  try {
    const [l] =  await db
     .update(localizationLanguages)
     .set(newLocalizationLanguage)
     .where(eq(localizationLanguages.id, localizationLanguageId!))
     .returning();
    return { localizationLanguage: l };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteLocalizationLanguage = async (id: LocalizationLanguageId) => {
  const { id: localizationLanguageId } = localizationLanguageIdSchema.parse({ id });
  try {
    const [l] =  await db.delete(localizationLanguages).where(eq(localizationLanguages.id, localizationLanguageId!))
    .returning();
    return { localizationLanguage: l };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

