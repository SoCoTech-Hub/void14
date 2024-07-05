import { eq } from "drizzle-orm";

import { db } from "../../db/index";
import {
  glossaryCategories,
  GlossaryCategoryId,
  glossaryCategoryIdSchema,
  insertGlossaryCategorySchema,
  NewGlossaryCategoryParams,
  UpdateGlossaryCategoryParams,
  updateGlossaryCategorySchema,
} from "../../db/schema/glossaryCategories";

export const createGlossaryCategory = async (
  glossaryCategory: NewGlossaryCategoryParams,
) => {
  const newGlossaryCategory =
    insertGlossaryCategorySchema.parse(glossaryCategory);
  try {
    const [g] = await db
      .insert(glossaryCategories)
      .values(newGlossaryCategory)
      .returning();
    return { glossaryCategory: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateGlossaryCategory = async (
  id: GlossaryCategoryId,
  glossaryCategory: UpdateGlossaryCategoryParams,
) => {
  const { id: glossaryCategoryId } = glossaryCategoryIdSchema.parse({ id });
  const newGlossaryCategory =
    updateGlossaryCategorySchema.parse(glossaryCategory);
  try {
    const [g] = await db
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
    const [g] = await db
      .delete(glossaryCategories)
      .where(eq(glossaryCategories.id, glossaryCategoryId!))
      .returning();
    return { glossaryCategory: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
