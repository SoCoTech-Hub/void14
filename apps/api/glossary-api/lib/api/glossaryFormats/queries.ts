import { eq } from "drizzle-orm";

import type { GlossaryFormatId } from "../../db/schema/glossaryFormats";
import { db } from "../../db/index";
import {
  glossaryFormatIdSchema,
  glossaryFormats,
} from "../../db/schema/glossaryFormats";

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
