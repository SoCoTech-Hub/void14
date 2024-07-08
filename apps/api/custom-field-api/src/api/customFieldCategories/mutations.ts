import { db } from "@soco/custom-field-db/index";
import { eq } from "drizzle-orm";
import { 
  CustomFieldCategoryId, 
  NewCustomFieldCategoryParams,
  UpdateCustomFieldCategoryParams, 
  updateCustomFieldCategorySchema,
  insertCustomFieldCategorySchema, 
  customFieldCategories,
  customFieldCategoryIdSchema 
} from "@soco/custom-field-db/schema/customFieldCategories";

export const createCustomFieldCategory = async (customFieldCategory: NewCustomFieldCategoryParams) => {
  const newCustomFieldCategory = insertCustomFieldCategorySchema.parse(customFieldCategory);
  try {
    const [c] =  await db.insert(customFieldCategories).values(newCustomFieldCategory).returning();
    return { customFieldCategory: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateCustomFieldCategory = async (id: CustomFieldCategoryId, customFieldCategory: UpdateCustomFieldCategoryParams) => {
  const { id: customFieldCategoryId } = customFieldCategoryIdSchema.parse({ id });
  const newCustomFieldCategory = updateCustomFieldCategorySchema.parse(customFieldCategory);
  try {
    const [c] =  await db
     .update(customFieldCategories)
     .set({...newCustomFieldCategory, updatedAt: new Date() })
     .where(eq(customFieldCategories.id, customFieldCategoryId!))
     .returning();
    return { customFieldCategory: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteCustomFieldCategory = async (id: CustomFieldCategoryId) => {
  const { id: customFieldCategoryId } = customFieldCategoryIdSchema.parse({ id });
  try {
    const [c] =  await db.delete(customFieldCategories).where(eq(customFieldCategories.id, customFieldCategoryId!))
    .returning();
    return { customFieldCategory: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

