import { eq } from "drizzle-orm";

import { db } from "../../db/index";
import {
  glossaries,
  GlossaryId,
  glossaryIdSchema,
  insertGlossarySchema,
  NewGlossaryParams,
  UpdateGlossaryParams,
  updateGlossarySchema,
} from "../../db/schema/glossaries";

export const createGlossary = async (glossary: NewGlossaryParams) => {
  const newGlossary = insertGlossarySchema.parse(glossary);
  try {
    const [g] = await db.insert(glossaries).values(newGlossary).returning();
    return { glossary: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateGlossary = async (
  id: GlossaryId,
  glossary: UpdateGlossaryParams,
) => {
  const { id: glossaryId } = glossaryIdSchema.parse({ id });
  const newGlossary = updateGlossarySchema.parse(glossary);
  try {
    const [g] = await db
      .update(glossaries)
      .set({ ...newGlossary, updatedAt: new Date() })
      .where(eq(glossaries.id, glossaryId!))
      .returning();
    return { glossary: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteGlossary = async (id: GlossaryId) => {
  const { id: glossaryId } = glossaryIdSchema.parse({ id });
  try {
    const [g] = await db
      .delete(glossaries)
      .where(eq(glossaries.id, glossaryId!))
      .returning();
    return { glossary: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
