import type {
  NewWikiPageParams,
  UpdateWikiPageParams,
  WikiPageId,
} from "@soco/wiki-db/schema/wikiPages";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/wiki-db";
import { db } from "@soco/wiki-db/client";
import {
  insertWikiPageSchema,
  updateWikiPageSchema,
  wikiPageIdSchema,
  wikiPages,
} from "@soco/wiki-db/schema/wikiPages";

export const createWikiPage = async (wikiPage: NewWikiPageParams) => {
  const { session } = await getUserAuth();
  const newWikiPage = insertWikiPageSchema.parse({
    ...wikiPage,
    userId: session?.user.id!,
  });
  try {
    const [w] = await db.insert(wikiPages).values(newWikiPage).returning();
    return { wikiPage: w };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateWikiPage = async (
  id: WikiPageId,
  wikiPage: UpdateWikiPageParams,
) => {
  const { session } = await getUserAuth();
  const { id: wikiPageId } = wikiPageIdSchema.parse({ id });
  const newWikiPage = updateWikiPageSchema.parse({
    ...wikiPage,
    userId: session?.user.id!,
  });
  try {
    const [w] = await db
      .update(wikiPages)
      .set({ ...newWikiPage, updatedAt: new Date() })
      .where(
        and(
          eq(wikiPages.id, wikiPageId!),
          eq(wikiPages.userId, session?.user.id!),
        ),
      )
      .returning();
    return { wikiPage: w };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteWikiPage = async (id: WikiPageId) => {
  const { session } = await getUserAuth();
  const { id: wikiPageId } = wikiPageIdSchema.parse({ id });
  try {
    const [w] = await db
      .delete(wikiPages)
      .where(
        and(
          eq(wikiPages.id, wikiPageId!),
          eq(wikiPages.userId, session?.user.id!),
        ),
      )
      .returning();
    return { wikiPage: w };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
