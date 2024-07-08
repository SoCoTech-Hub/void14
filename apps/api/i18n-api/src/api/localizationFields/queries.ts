import { db } from "@soco/i18n-db/index";
import { eq } from "drizzle-orm";
import { type LocalizationFieldId, localizationFieldIdSchema, localizationFields } from "@soco/i18n-db/schema/localizationFields";

export const getLocalizationFields = async () => {
  const rows = await db.select().from(localizationFields);
  const l = rows
  return { localizationFields: l };
};

export const getLocalizationFieldById = async (id: LocalizationFieldId) => {
  const { id: localizationFieldId } = localizationFieldIdSchema.parse({ id });
  const [row] = await db.select().from(localizationFields).where(eq(localizationFields.id, localizationFieldId));
  if (row === undefined) return {};
  const l = row;
  return { localizationField: l };
};


