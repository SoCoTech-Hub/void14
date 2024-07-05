import { eq } from "drizzle-orm";

import { db } from "../../db/index";
import {
  glossaryEntriesCategories,
  GlossaryEntriesCategoryId,
  glossaryEntriesCategoryIdSchema,
  insertGlossaryEntriesCategorySchema,
  NewGlossaryEntriesCategoryParams,
  UpdateGlossaryEntriesCategoryParams,
  updateGlossaryEntriesCategorySchema,
} from "../../db/schema/glossaryEntriesCategories";

export const createGlossaryEntriesCategory = async (
  glossaryEntriesCategory: NewGlossaryEntriesCategoryParams,
) => {
  const newGlossaryEntriesCategory = insertGlossaryEntriesCategorySchema.parse(
    glossaryEntriesCategory,
  );
  try {
    const [g] = await db
      .insert(glossaryEntriesCategories)
      .values(newGlossaryEntriesCategory)
      .returning();
    return { glossaryEntriesCategory: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateGlossaryEntriesCategory = async (
  id: GlossaryEntriesCategoryId,
  glossaryEntriesCategory: UpdateGlossaryEntriesCategoryParams,
) => {
  const { id: glossaryEntriesCategoryId } =
    glossaryEntriesCategoryIdSchema.parse({ id });
  const newGlossaryEntriesCategory = updateGlossaryEntriesCategorySchema.parse(
    glossaryEntriesCategory,
  );
  try {
    const [g] = await db
      .update(glossaryEntriesCategories)
      .set(newGlossaryEntriesCategory)
      .where(eq(glossaryEntriesCategories.id, glossaryEntriesCategoryId!))
      .returning();
    return { glossaryEntriesCategory: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteGlossaryEntriesCategory = async (
  id: GlossaryEntriesCategoryId,
) => {
  const { id: glossaryEntriesCategoryId } =
    glossaryEntriesCategoryIdSchema.parse({ id });
  try {
    const [g] = await db
      .delete(glossaryEntriesCategories)
      .where(eq(glossaryEntriesCategories.id, glossaryEntriesCategoryId!))
      .returning();
    return { glossaryEntriesCategory: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
