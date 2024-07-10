import { db } from "@soco/glossary-db/client";
import { and, eq } from "@soco/glossary-db";
import { 
  GlossaryEntryId, 
  NewGlossaryEntryParams,
  UpdateGlossaryEntryParams, 
  updateGlossaryEntrySchema,
  insertGlossaryEntrySchema, 
  glossaryEntries,
  glossaryEntryIdSchema 
} from "@soco/glossary-db/schema/glossaryEntries";
import { getUserAuth } from "@/lib/auth/utils";

export const createGlossaryEntry = async (glossaryEntry: NewGlossaryEntryParams) => {
  const { session } = await getUserAuth();
  const newGlossaryEntry = insertGlossaryEntrySchema.parse({ ...glossaryEntry, userId: session?.user.id! });
  try {
    const [g] =  await db.insert(glossaryEntries).values(newGlossaryEntry).returning();
    return { glossaryEntry: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateGlossaryEntry = async (id: GlossaryEntryId, glossaryEntry: UpdateGlossaryEntryParams) => {
  const { session } = await getUserAuth();
  const { id: glossaryEntryId } = glossaryEntryIdSchema.parse({ id });
  const newGlossaryEntry = updateGlossaryEntrySchema.parse({ ...glossaryEntry, userId: session?.user.id! });
  try {
    const [g] =  await db
     .update(glossaryEntries)
     .set({...newGlossaryEntry, updatedAt: new Date() })
     .where(and(eq(glossaryEntries.id, glossaryEntryId!), eq(glossaryEntries.userId, session?.user.id!)))
     .returning();
    return { glossaryEntry: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteGlossaryEntry = async (id: GlossaryEntryId) => {
  const { session } = await getUserAuth();
  const { id: glossaryEntryId } = glossaryEntryIdSchema.parse({ id });
  try {
    const [g] =  await db.delete(glossaryEntries).where(and(eq(glossaryEntries.id, glossaryEntryId!), eq(glossaryEntries.userId, session?.user.id!)))
    .returning();
    return { glossaryEntry: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

