import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import type { WikiSubwikiId } from "../../db/schema/wikiSubwikis";
import { db } from "../../db/index";
import { wikis } from "../../db/schema/wikis";
import {
  wikiSubwikiIdSchema,
  wikiSubwikis,
} from "../../db/schema/wikiSubwikis";

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
