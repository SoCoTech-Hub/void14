import { db } from "@soco/wiki-db/client";
import { eq, and } from "@soco/wiki-db";
import { getUserAuth } from "@soco/auth-service";
import { type WikiPageId, wikiPageIdSchema, wikiPages } from "@soco/wiki-db/schema/wikiPages";

export const getWikiPages = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select().from(wikiPages).where(eq(wikiPages.userId, session?.user.id!));
  const w = rows
  return { wikiPages: w };
};

export const getWikiPageById = async (id: WikiPageId) => {
  const { session } = await getUserAuth();
  const { id: wikiPageId } = wikiPageIdSchema.parse({ id });
  const [row] = await db.select().from(wikiPages).where(and(eq(wikiPages.id, wikiPageId), eq(wikiPages.userId, session?.user.id!)));
  if (row === undefined) return {};
  const w = row;
  return { wikiPage: w };
};


