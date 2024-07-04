import { eq } from "drizzle-orm";

import { db } from "../db/index";
import {
  glossaryAliases,
  GlossaryAliasId,
  glossaryAliasIdSchema,
  insertGlossaryAliasSchema,
  NewGlossaryAliasParams,
  UpdateGlossaryAliasParams,
  updateGlossaryAliasSchema,
} from "../db/schema/glossaryAliases";

export const createGlossaryAlias = async (
  glossaryAlias: NewGlossaryAliasParams,
) => {
  const newGlossaryAlias = insertGlossaryAliasSchema.parse(glossaryAlias);
  try {
    const [g] = await db
      .insert(glossaryAliases)
      .values(newGlossaryAlias)
      .returning();
    return { glossaryAlias: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateGlossaryAlias = async (
  id: GlossaryAliasId,
  glossaryAlias: UpdateGlossaryAliasParams,
) => {
  const { id: glossaryAliasId } = glossaryAliasIdSchema.parse({ id });
  const newGlossaryAlias = updateGlossaryAliasSchema.parse(glossaryAlias);
  try {
    const [g] = await db
      .update(glossaryAliases)
      .set(newGlossaryAlias)
      .where(eq(glossaryAliases.id, glossaryAliasId!))
      .returning();
    return { glossaryAlias: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteGlossaryAlias = async (id: GlossaryAliasId) => {
  const { id: glossaryAliasId } = glossaryAliasIdSchema.parse({ id });
  try {
    const [g] = await db
      .delete(glossaryAliases)
      .where(eq(glossaryAliases.id, glossaryAliasId!))
      .returning();
    return { glossaryAlias: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
