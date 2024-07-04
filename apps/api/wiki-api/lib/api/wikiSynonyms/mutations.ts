import { eq } from "drizzle-orm";

import { db } from "../db/index";
import {
  insertWikiSynonymSchema,
  NewWikiSynonymParams,
  UpdateWikiSynonymParams,
  updateWikiSynonymSchema,
  WikiSynonymId,
  wikiSynonymIdSchema,
  wikiSynonyms,
} from "../db/schema/wikiSynonyms";

export const createWikiSynonym = async (wikiSynonym: NewWikiSynonymParams) => {
  const newWikiSynonym = insertWikiSynonymSchema.parse(wikiSynonym);
  try {
    const [w] = await db
      .insert(wikiSynonyms)
      .values(newWikiSynonym)
      .returning();
    return { wikiSynonym: w };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateWikiSynonym = async (
  id: WikiSynonymId,
  wikiSynonym: UpdateWikiSynonymParams,
) => {
  const { id: wikiSynonymId } = wikiSynonymIdSchema.parse({ id });
  const newWikiSynonym = updateWikiSynonymSchema.parse(wikiSynonym);
  try {
    const [w] = await db
      .update(wikiSynonyms)
      .set(newWikiSynonym)
      .where(eq(wikiSynonyms.id, wikiSynonymId!))
      .returning();
    return { wikiSynonym: w };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteWikiSynonym = async (id: WikiSynonymId) => {
  const { id: wikiSynonymId } = wikiSynonymIdSchema.parse({ id });
  try {
    const [w] = await db
      .delete(wikiSynonyms)
      .where(eq(wikiSynonyms.id, wikiSynonymId!))
      .returning();
    return { wikiSynonym: w };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
