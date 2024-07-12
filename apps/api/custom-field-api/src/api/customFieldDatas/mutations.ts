import { db } from "@soco/custom-field-db/client";
import { eq } from "@soco/custom-field-db";
import { 
  type CustomFieldDataId, 
  type NewCustomFieldDataParams,
  type UpdateCustomFieldDataParams, 
  updateCustomFieldDataSchema,
  insertCustomFieldDataSchema, 
  customFieldDatas,
  customFieldDataIdSchema 
} from "@soco/custom-field-db/schema/customFieldDatas";

export const createCustomFieldData = async (customFieldData: NewCustomFieldDataParams) => {
  const newCustomFieldData = insertCustomFieldDataSchema.parse(customFieldData);
  try {
    const [c] =  await db.insert(customFieldDatas).values(newCustomFieldData).returning();
    return { customFieldData: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateCustomFieldData = async (id: CustomFieldDataId, customFieldData: UpdateCustomFieldDataParams) => {
  const { id: customFieldDataId } = customFieldDataIdSchema.parse({ id });
  const newCustomFieldData = updateCustomFieldDataSchema.parse(customFieldData);
  try {
    const [c] =  await db
     .update(customFieldDatas)
     .set({...newCustomFieldData, updatedAt: new Date() })
     .where(eq(customFieldDatas.id, customFieldDataId!))
     .returning();
    return { customFieldData: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteCustomFieldData = async (id: CustomFieldDataId) => {
  const { id: customFieldDataId } = customFieldDataIdSchema.parse({ id });
  try {
    const [c] =  await db.delete(customFieldDatas).where(eq(customFieldDatas.id, customFieldDataId!))
    .returning();
    return { customFieldData: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

