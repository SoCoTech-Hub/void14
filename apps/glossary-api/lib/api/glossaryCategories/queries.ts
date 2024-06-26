import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type GlossaryCategoryId, glossaryCategoryIdSchema, glossaryCategories } from "@/lib/db/schema/glossaryCategories";
import { glossaries } from "@/lib/db/schema/glossaries";

export const getGlossaryCategories = async () => {
  const rows = await db.select({ glossaryCategory: glossaryCategories, glossary: glossaries }).from(glossaryCategories).leftJoin(glossaries, eq(glossaryCategories.glossaryId, glossaries.id));
  const g = rows .map((r) => ({ ...r.glossaryCategory, glossary: r.glossary})); 
  return { glossaryCategories: g };
};

export const getGlossaryCategoryById = async (id: GlossaryCategoryId) => {
  const { id: glossaryCategoryId } = glossaryCategoryIdSchema.parse({ id });
  const [row] = await db.select({ glossaryCategory: glossaryCategories, glossary: glossaries }).from(glossaryCategories).where(eq(glossaryCategories.id, glossaryCategoryId)).leftJoin(glossaries, eq(glossaryCategories.glossaryId, glossaries.id));
  if (row === undefined) return {};
  const g =  { ...row.glossaryCategory, glossary: row.glossary } ;
  return { glossaryCategory: g };
};


