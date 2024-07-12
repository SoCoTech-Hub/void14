import { db } from "@soco/digilib-db/client";
import { eq } from "@soco/digilib-db";
import { 
  type DigilibCategoryId, 
  type NewDigilibCategoryParams,
  type UpdateDigilibCategoryParams, 
  updateDigilibCategorySchema,
  insertDigilibCategorySchema, 
  digilibCategories,
  digilibCategoryIdSchema 
} from "@soco/digilib-db/schema/digilibCategories";

export const createDigilibCategory = async (digilibCategory: NewDigilibCategoryParams) => {
  const newDigilibCategory = insertDigilibCategorySchema.parse(digilibCategory);
  try {
    const [d] =  await db.insert(digilibCategories).values(newDigilibCategory).returning();
    return { digilibCategory: d };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateDigilibCategory = async (id: DigilibCategoryId, digilibCategory: UpdateDigilibCategoryParams) => {
  const { id: digilibCategoryId } = digilibCategoryIdSchema.parse({ id });
  const newDigilibCategory = updateDigilibCategorySchema.parse(digilibCategory);
  try {
    const [d] =  await db
     .update(digilibCategories)
     .set(newDigilibCategory)
     .where(eq(digilibCategories.id, digilibCategoryId!))
     .returning();
    return { digilibCategory: d };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteDigilibCategory = async (id: DigilibCategoryId) => {
  const { id: digilibCategoryId } = digilibCategoryIdSchema.parse({ id });
  try {
    const [d] =  await db.delete(digilibCategories).where(eq(digilibCategories.id, digilibCategoryId!))
    .returning();
    return { digilibCategory: d };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

