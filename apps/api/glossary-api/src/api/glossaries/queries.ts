import { db } from "@soco/glossary-db/client";
import { eq } from "@soco/glossary-db";
import { type GlossaryId, glossaryIdSchema, glossaries } from "@soco/glossary-db/schema/glossaries";

export const getGlossaries = async () => {
  const rows = await db.select().from(glossaries);
  const g = rows
  return { glossaries: g };
};

export const getGlossaryById = async (id: GlossaryId) => {
  const { id: glossaryId } = glossaryIdSchema.parse({ id });
  const [row] = await db.select().from(glossaries).where(eq(glossaries.id, glossaryId));
  if (row === undefined) return {};
  const g = row;
  return { glossary: g };
};


