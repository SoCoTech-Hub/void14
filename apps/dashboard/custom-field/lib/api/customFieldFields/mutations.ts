import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  type CustomFieldFieldId, 
  type NewCustomFieldFieldParams,
  type UpdateCustomFieldFieldParams, 
  updateCustomFieldFieldSchema,
  insertCustomFieldFieldSchema, 
  customFieldFields,
  customFieldFieldIdSchema 
} from "@/lib/db/schema/customFieldFields";

export const createCustomFieldField = async (customFieldField: NewCustomFieldFieldParams) => {
  const newCustomFieldField = insertCustomFieldFieldSchema.parse(customFieldField);
  try {
    const [c] =  await db.insert(customFieldFields).values(newCustomFieldField).returning();
    return { customFieldField: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateCustomFieldField = async (id: CustomFieldFieldId, customFieldField: UpdateCustomFieldFieldParams) => {
  const { id: customFieldFieldId } = customFieldFieldIdSchema.parse({ id });
  const newCustomFieldField = updateCustomFieldFieldSchema.parse(customFieldField);
  try {
    const [c] =  await db
     .update(customFieldFields)
     .set({...newCustomFieldField, updatedAt: new Date() })
     .where(eq(customFieldFields.id, customFieldFieldId!))
     .returning();
    return { customFieldField: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteCustomFieldField = async (id: CustomFieldFieldId) => {
  const { id: customFieldFieldId } = customFieldFieldIdSchema.parse({ id });
  try {
    const [c] =  await db.delete(customFieldFields).where(eq(customFieldFields.id, customFieldFieldId!))
    .returning();
    return { customFieldField: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

