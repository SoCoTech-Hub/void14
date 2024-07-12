import { db } from "@soco/glossary-db/client";
import { eq } from "@soco/glossary-db";
import { 
  type GlossaryFormatId, 
  type NewGlossaryFormatParams,
  type UpdateGlossaryFormatParams, 
  updateGlossaryFormatSchema,
  insertGlossaryFormatSchema, 
  glossaryFormats,
  glossaryFormatIdSchema 
} from "@soco/glossary-db/schema/glossaryFormats";

export const createGlossaryFormat = async (glossaryFormat: NewGlossaryFormatParams) => {
  const newGlossaryFormat = insertGlossaryFormatSchema.parse(glossaryFormat);
  try {
    const [g] =  await db.insert(glossaryFormats).values(newGlossaryFormat).returning();
    return { glossaryFormat: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateGlossaryFormat = async (id: GlossaryFormatId, glossaryFormat: UpdateGlossaryFormatParams) => {
  const { id: glossaryFormatId } = glossaryFormatIdSchema.parse({ id });
  const newGlossaryFormat = updateGlossaryFormatSchema.parse(glossaryFormat);
  try {
    const [g] =  await db
     .update(glossaryFormats)
     .set(newGlossaryFormat)
     .where(eq(glossaryFormats.id, glossaryFormatId!))
     .returning();
    return { glossaryFormat: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteGlossaryFormat = async (id: GlossaryFormatId) => {
  const { id: glossaryFormatId } = glossaryFormatIdSchema.parse({ id });
  try {
    const [g] =  await db.delete(glossaryFormats).where(eq(glossaryFormats.id, glossaryFormatId!))
    .returning();
    return { glossaryFormat: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

