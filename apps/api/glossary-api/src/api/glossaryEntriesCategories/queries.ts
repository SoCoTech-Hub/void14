import type { GlossaryEntriesCategoryId } from "@soco/glossary-db/schema/glossaryEntriesCategories";
import { eq } from "@soco/glossary-db";
import { db } from "@soco/glossary-db/client";
import {
  glossaryEntriesCategories,
  glossaryEntriesCategoryIdSchema,
} from "@soco/glossary-db/schema/glossaryEntriesCategories";

export const getGlossaryEntriesCategories = async () => {
  const rows = await db.select().from(glossaryEntriesCategories);
  const g = rows;
  return { glossaryEntriesCategories: g };
};

export const getGlossaryEntriesCategoryById = async (
  id: GlossaryEntriesCategoryId,
) => {
  const { id: glossaryEntriesCategoryId } =
    glossaryEntriesCategoryIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(glossaryEntriesCategories)
    .where(eq(glossaryEntriesCategories.id, glossaryEntriesCategoryId));
  if (row === undefined) return {};
  const g = row;
  return { glossaryEntriesCategory: g };
};
