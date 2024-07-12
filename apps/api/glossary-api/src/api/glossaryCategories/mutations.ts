import { db } from "@soco/glossary-db/client";
import { eq } from "@soco/glossary-db";
import { 
  type GlossaryCategoryId, 
  type NewGlossaryCategoryParams,
  type UpdateGlossaryCategoryParams, 
  updateGlossaryCategorySchema,
  insertGlossaryCategorySchema, 
  glossaryCategories,
  glossaryCategoryIdSchema 
} from "@soco/glossary-db/schema/glossaryCategories";

export const createGlossaryCategory = async (glossaryCategory: NewGlossaryCategoryParams) => {
  const newGlossaryCategory = insertGlossaryCategorySchema.parse(glossaryCategory);
  try {
    const [g] =  await db.insert(glossaryCategories).values(newGlossaryCategory).returning();
    return { glossaryCategory: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateGlossaryCategory = async (id: GlossaryCategoryId, glossaryCategory: UpdateGlossaryCategoryParams) => {
  const { id: glossaryCategoryId } = glossaryCategoryIdSchema.parse({ id });
  const newGlossaryCategory = updateGlossaryCategorySchema.parse(glossaryCategory);
  try {
    const [g] =  await db
     .update(glossaryCategories)
     .set(newGlossaryCategory)
     .where(eq(glossaryCategories.id, glossaryCategoryId!))
     .returning();
    return { glossaryCategory: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteGlossaryCategory = async (id: GlossaryCategoryId) => {
  const { id: glossaryCategoryId } = glossaryCategoryIdSchema.parse({ id });
  try {
    const [g] =  await db.delete(glossaryCategories).where(eq(glossaryCategories.id, glossaryCategoryId!))
    .returning();
    return { glossaryCategory: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

