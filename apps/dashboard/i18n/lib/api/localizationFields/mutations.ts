import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  type LocalizationFieldId, 
  type NewLocalizationFieldParams,
  type UpdateLocalizationFieldParams, 
  updateLocalizationFieldSchema,
  insertLocalizationFieldSchema, 
  localizationFields,
  localizationFieldIdSchema 
} from "@/lib/db/schema/localizationFields";

export const createLocalizationField = async (localizationField: NewLocalizationFieldParams) => {
  const newLocalizationField = insertLocalizationFieldSchema.parse(localizationField);
  try {
    const [l] =  await db.insert(localizationFields).values(newLocalizationField).returning();
    return { localizationField: l };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateLocalizationField = async (id: LocalizationFieldId, localizationField: UpdateLocalizationFieldParams) => {
  const { id: localizationFieldId } = localizationFieldIdSchema.parse({ id });
  const newLocalizationField = updateLocalizationFieldSchema.parse(localizationField);
  try {
    const [l] =  await db
     .update(localizationFields)
     .set(newLocalizationField)
     .where(eq(localizationFields.id, localizationFieldId!))
     .returning();
    return { localizationField: l };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteLocalizationField = async (id: LocalizationFieldId) => {
  const { id: localizationFieldId } = localizationFieldIdSchema.parse({ id });
  try {
    const [l] =  await db.delete(localizationFields).where(eq(localizationFields.id, localizationFieldId!))
    .returning();
    return { localizationField: l };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

