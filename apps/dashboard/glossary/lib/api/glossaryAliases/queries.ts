import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type GlossaryAliasId, glossaryAliasIdSchema, glossaryAliases } from "@/lib/db/schema/glossaryAliases";

export const getGlossaryAliases = async () => {
  const rows = await db.select().from(glossaryAliases);
  const g = rows
  return { glossaryAliases: g };
};

export const getGlossaryAliasById = async (id: GlossaryAliasId) => {
  const { id: glossaryAliasId } = glossaryAliasIdSchema.parse({ id });
  const [row] = await db.select().from(glossaryAliases).where(eq(glossaryAliases.id, glossaryAliasId));
  if (row === undefined) return {};
  const g = row;
  return { glossaryAlias: g };
};


