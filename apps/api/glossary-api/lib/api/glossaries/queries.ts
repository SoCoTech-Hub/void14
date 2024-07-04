import { eq } from "drizzle-orm";

import type { GlossaryId } from "../db/schema/glossaries";
import { db } from "../db/index";
import { glossaries, glossaryIdSchema } from "../db/schema/glossaries";

export const getGlossaries = async () => {
  const rows = await db.select().from(glossaries);
  const g = rows;
  return { glossaries: g };
};

export const getGlossaryById = async (id: GlossaryId) => {
  const { id: glossaryId } = glossaryIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(glossaries)
    .where(eq(glossaries.id, glossaryId));
  if (row === undefined) return {};
  const g = row;
  return { glossary: g };
};
