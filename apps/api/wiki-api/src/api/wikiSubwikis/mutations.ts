import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth-services";
import { db } from "@soco/wiki-db/index";
import {
  insertWikiSubwikiSchema,
  NewWikiSubwikiParams,
  UpdateWikiSubwikiParams,
  updateWikiSubwikiSchema,
  WikiSubwikiId,
  wikiSubwikiIdSchema,
  wikiSubwikis,
} from "@soco/wiki-db/schema/wikiSubwikis";

export const createWikiSubwiki = async (wikiSubwiki: NewWikiSubwikiParams) => {
  const { session } = await getUserAuth();
  const newWikiSubwiki = insertWikiSubwikiSchema.parse({
    ...wikiSubwiki,
    userId: session?.user.id!,
  });
  try {
    const [w] = await db
      .insert(wikiSubwikis)
      .values(newWikiSubwiki)
      .returning();
    return { wikiSubwiki: w };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateWikiSubwiki = async (
  id: WikiSubwikiId,
  wikiSubwiki: UpdateWikiSubwikiParams,
) => {
  const { session } = await getUserAuth();
  const { id: wikiSubwikiId } = wikiSubwikiIdSchema.parse({ id });
  const newWikiSubwiki = updateWikiSubwikiSchema.parse({
    ...wikiSubwiki,
    userId: session?.user.id!,
  });
  try {
    const [w] = await db
      .update(wikiSubwikis)
      .set(newWikiSubwiki)
      .where(
        and(
          eq(wikiSubwikis.id, wikiSubwikiId!),
          eq(wikiSubwikis.userId, session?.user.id!),
        ),
      )
      .returning();
    return { wikiSubwiki: w };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteWikiSubwiki = async (id: WikiSubwikiId) => {
  const { session } = await getUserAuth();
  const { id: wikiSubwikiId } = wikiSubwikiIdSchema.parse({ id });
  try {
    const [w] = await db
      .delete(wikiSubwikis)
      .where(
        and(
          eq(wikiSubwikis.id, wikiSubwikiId!),
          eq(wikiSubwikis.userId, session?.user.id!),
        ),
      )
      .returning();
    return { wikiSubwiki: w };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};