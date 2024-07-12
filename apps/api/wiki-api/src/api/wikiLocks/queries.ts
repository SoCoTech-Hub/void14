import type { WikiLockId } from "@soco/wiki-db/schema/wikiLocks";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/wiki-db";
import { db } from "@soco/wiki-db/client";
import { wikiLockIdSchema, wikiLocks } from "@soco/wiki-db/schema/wikiLocks";
import { wikiPages } from "@soco/wiki-db/schema/wikiPages";

export const getWikiLocks = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select({ wikiLock: wikiLocks, wikiPage: wikiPages })
    .from(wikiLocks)
    .leftJoin(wikiPages, eq(wikiLocks.wikiPageId, wikiPages.id))
    .where(eq(wikiLocks.userId, session?.user.id!));
  const w = rows.map((r) => ({ ...r.wikiLock, wikiPage: r.wikiPage }));
  return { wikiLocks: w };
};

export const getWikiLockById = async (id: WikiLockId) => {
  const { session } = await getUserAuth();
  const { id: wikiLockId } = wikiLockIdSchema.parse({ id });
  const [row] = await db
    .select({ wikiLock: wikiLocks, wikiPage: wikiPages })
    .from(wikiLocks)
    .where(
      and(
        eq(wikiLocks.id, wikiLockId),
        eq(wikiLocks.userId, session?.user.id!),
      ),
    )
    .leftJoin(wikiPages, eq(wikiLocks.wikiPageId, wikiPages.id));
  if (row === undefined) return {};
  const w = { ...row.wikiLock, wikiPage: row.wikiPage };
  return { wikiLock: w };
};
