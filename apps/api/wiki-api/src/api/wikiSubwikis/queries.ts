import { and, eq } from "drizzle-orm";

import type { WikiSubwikiId } from "@soco/wiki-db/schema/wikiSubwikis";
import { getUserAuth } from "@soco/auth-services";
import { db } from "@soco/wiki-db/index";
import { wikis } from "@soco/wiki-db/schema/wikis";
import {
  wikiSubwikiIdSchema,
  wikiSubwikis,
} from "@soco/wiki-db/schema/wikiSubwikis";

export const getWikiSubwikis = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select({ wikiSubwiki: wikiSubwikis, wiki: wikis })
    .from(wikiSubwikis)
    .leftJoin(wikis, eq(wikiSubwikis.wikiId, wikis.id))
    .where(eq(wikiSubwikis.userId, session?.user.id!));
  const w = rows.map((r) => ({ ...r.wikiSubwiki, wiki: r.wiki }));
  return { wikiSubwikis: w };
};

export const getWikiSubwikiById = async (id: WikiSubwikiId) => {
  const { session } = await getUserAuth();
  const { id: wikiSubwikiId } = wikiSubwikiIdSchema.parse({ id });
  const [row] = await db
    .select({ wikiSubwiki: wikiSubwikis, wiki: wikis })
    .from(wikiSubwikis)
    .where(
      and(
        eq(wikiSubwikis.id, wikiSubwikiId),
        eq(wikiSubwikis.userId, session?.user.id!),
      ),
    )
    .leftJoin(wikis, eq(wikiSubwikis.wikiId, wikis.id));
  if (row === undefined) return {};
  const w = { ...row.wikiSubwiki, wiki: row.wiki };
  return { wikiSubwiki: w };
};
