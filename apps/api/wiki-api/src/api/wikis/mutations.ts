import type {
  NewWikiParams,
  UpdateWikiParams,
  WikiId,
} from "@soco/wiki-db/schema/wikis";
import { eq } from "@soco/wiki-db";
import { db } from "@soco/wiki-db/client";
import {
  insertWikiSchema,
  updateWikiSchema,
  wikiIdSchema,
  wikis,
} from "@soco/wiki-db/schema/wikis";

export const createWiki = async (wiki: NewWikiParams) => {
  const newWiki = insertWikiSchema.parse(wiki);
  try {
    const [w] = await db.insert(wikis).values(newWiki).returning();
    return { wiki: w };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateWiki = async (id: WikiId, wiki: UpdateWikiParams) => {
  const { id: wikiId } = wikiIdSchema.parse({ id });
  const newWiki = updateWikiSchema.parse(wiki);
  try {
    const [w] = await db
      .update(wikis)
      .set({ ...newWiki, updatedAt: new Date() })
      .where(eq(wikis.id, wikiId!))
      .returning();
    return { wiki: w };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteWiki = async (id: WikiId) => {
  const { id: wikiId } = wikiIdSchema.parse({ id });
  try {
    const [w] = await db.delete(wikis).where(eq(wikis.id, wikiId!)).returning();
    return { wiki: w };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
