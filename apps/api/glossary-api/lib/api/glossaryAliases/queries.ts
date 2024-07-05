import { eq } from "drizzle-orm";

import type { GlossaryAliasId } from "../../db/schema/glossaryAliases";
import { db } from "../../db/index";
import {
  glossaryAliases,
  glossaryAliasIdSchema,
} from "../../db/schema/glossaryAliases";

export const getGlossaryAliases = async () => {
  const rows = await db.select().from(glossaryAliases);
  const g = rows;
  return { glossaryAliases: g };
};

export const getGlossaryAliasById = async (id: GlossaryAliasId) => {
  const { id: glossaryAliasId } = glossaryAliasIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(glossaryAliases)
    .where(eq(glossaryAliases.id, glossaryAliasId));
  if (row === undefined) return {};
  const g = row;
  return { glossaryAlias: g };
};
