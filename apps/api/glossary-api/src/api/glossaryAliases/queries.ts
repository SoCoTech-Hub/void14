import { db } from "@soco/glossary-db/client";
import { eq } from "@soco/glossary-db";
import { type GlossaryAliasId, glossaryAliasIdSchema, glossaryAliases } from "@soco/glossary-db/schema/glossaryAliases";

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


