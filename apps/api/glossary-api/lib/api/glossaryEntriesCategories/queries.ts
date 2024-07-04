import { eq } from "drizzle-orm";

import type { GlossaryEntriesCategoryId } from "../db/schema/glossaryEntriesCategories";
import { db } from "../db/index";
import {
  glossaryEntriesCategories,
  glossaryEntriesCategoryIdSchema,
} from "../db/schema/glossaryEntriesCategories";

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
