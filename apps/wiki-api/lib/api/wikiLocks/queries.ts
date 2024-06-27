import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { type WikiLockId, wikiLockIdSchema, wikiLocks } from "@/lib/db/schema/wikiLocks";
import { wikiPages } from "@/lib/db/schema/wikiPages";

export const getWikiLocks = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select({ wikiLock: wikiLocks, wikiPage: wikiPages }).from(wikiLocks).leftJoin(wikiPages, eq(wikiLocks.wikiPageId, wikiPages.id)).where(eq(wikiLocks.userId, session?.user.id!));
  const w = rows .map((r) => ({ ...r.wikiLock, wikiPage: r.wikiPage})); 
  return { wikiLocks: w };
};

export const getWikiLockById = async (id: WikiLockId) => {
  const { session } = await getUserAuth();
  const { id: wikiLockId } = wikiLockIdSchema.parse({ id });
  const [row] = await db.select({ wikiLock: wikiLocks, wikiPage: wikiPages }).from(wikiLocks).where(and(eq(wikiLocks.id, wikiLockId), eq(wikiLocks.userId, session?.user.id!))).leftJoin(wikiPages, eq(wikiLocks.wikiPageId, wikiPages.id));
  if (row === undefined) return {};
  const w =  { ...row.wikiLock, wikiPage: row.wikiPage } ;
  return { wikiLock: w };
};


