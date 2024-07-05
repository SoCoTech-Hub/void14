import { eq } from "drizzle-orm";

import type { WikiSynonymId } from "../../db/schema/wikiSynonyms";
import { db } from "../../db/index";
import { wikiPages } from "../../db/schema/wikiPages";
import { wikiSubwikis } from "../../db/schema/wikiSubwikis";
import {
  wikiSynonymIdSchema,
  wikiSynonyms,
} from "../../db/schema/wikiSynonyms";

export const getWikiSynonyms = async () => {
  const rows = await db
    .select({
      wikiSynonym: wikiSynonyms,
      wikiPage: wikiPages,
      wikiSubwiki: wikiSubwikis,
    })
    .from(wikiSynonyms)
    .leftJoin(wikiPages, eq(wikiSynonyms.wikiPageId, wikiPages.id))
    .leftJoin(wikiSubwikis, eq(wikiSynonyms.wikiSubwikiId, wikiSubwikis.id));
  const w = rows.map((r) => ({
    ...r.wikiSynonym,
    wikiPage: r.wikiPage,
    wikiSubwiki: r.wikiSubwiki,
  }));
  return { wikiSynonyms: w };
};

export const getWikiSynonymById = async (id: WikiSynonymId) => {
  const { id: wikiSynonymId } = wikiSynonymIdSchema.parse({ id });
  const [row] = await db
    .select({
      wikiSynonym: wikiSynonyms,
      wikiPage: wikiPages,
      wikiSubwiki: wikiSubwikis,
    })
    .from(wikiSynonyms)
    .where(eq(wikiSynonyms.id, wikiSynonymId))
    .leftJoin(wikiPages, eq(wikiSynonyms.wikiPageId, wikiPages.id))
    .leftJoin(wikiSubwikis, eq(wikiSynonyms.wikiSubwikiId, wikiSubwikis.id));
  if (row === undefined) return {};
  const w = {
    ...row.wikiSynonym,
    wikiPage: row.wikiPage,
    wikiSubwiki: row.wikiSubwiki,
  };
  return { wikiSynonym: w };
};
