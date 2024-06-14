import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type GlossaryEntriesCategoryId, glossaryEntriesCategoryIdSchema, glossaryEntriesCategories } from "@/lib/db/schema/glossaryEntriesCategories";

export const getGlossaryEntriesCategories = async () => {
  const rows = await db.select().from(glossaryEntriesCategories);
  const g = rows
  return { glossaryEntriesCategories: g };
};

export const getGlossaryEntriesCategoryById = async (id: GlossaryEntriesCategoryId) => {
  const { id: glossaryEntriesCategoryId } = glossaryEntriesCategoryIdSchema.parse({ id });
  const [row] = await db.select().from(glossaryEntriesCategories).where(eq(glossaryEntriesCategories.id, glossaryEntriesCategoryId));
  if (row === undefined) return {};
  const g = row;
  return { glossaryEntriesCategory: g };
};


