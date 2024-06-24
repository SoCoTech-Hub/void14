import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { type WikiPageId, wikiPageIdSchema, wikiPages } from "@/lib/db/schema/wikiPages";

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


