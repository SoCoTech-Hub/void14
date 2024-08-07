import type { GlossaryFormatId } from "@soco/glossary-db/schema/glossaryFormats";
import { eq } from "@soco/glossary-db";
import { db } from "@soco/glossary-db/client";
import {
  glossaryFormatIdSchema,
  glossaryFormats,
} from "@soco/glossary-db/schema/glossaryFormats";

export const getGlossaryFormats = async () => {
  const rows = await db.select().from(glossaryFormats);
  const g = rows;
  return { glossaryFormats: g };
};

export const getGlossaryFormatById = async (id: GlossaryFormatId) => {
  const { id: glossaryFormatId } = glossaryFormatIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(glossaryFormats)
    .where(eq(glossaryFormats.id, glossaryFormatId));
  if (row === undefined) return {};
  const g = row;
  return { glossaryFormat: g };
};
