import { db } from "@soco/wiki-db/index";
import { eq } from "drizzle-orm";
import { type WikiSynonymId, wikiSynonymIdSchema, wikiSynonyms } from "@soco/wiki-db/schema/wikiSynonyms";
import { wikiPages } from "@soco/wiki-db/schema/wikiPages";
import { wikiSubwikis } from "@soco/wiki-db/schema/wikiSubwikis";

export const getWikiSynonyms = async () => {
  const rows = await db.select({ wikiSynonym: wikiSynonyms, wikiPage: wikiPages, wikiSubwiki: wikiSubwikis }).from(wikiSynonyms).leftJoin(wikiPages, eq(wikiSynonyms.wikiPageId, wikiPages.id)).leftJoin(wikiSubwikis, eq(wikiSynonyms.wikiSubwikiId, wikiSubwikis.id));
  const w = rows .map((r) => ({ ...r.wikiSynonym, wikiPage: r.wikiPage, wikiSubwiki: r.wikiSubwiki})); 
  return { wikiSynonyms: w };
};

export const getWikiSynonymById = async (id: WikiSynonymId) => {
  const { id: wikiSynonymId } = wikiSynonymIdSchema.parse({ id });
  const [row] = await db.select({ wikiSynonym: wikiSynonyms, wikiPage: wikiPages, wikiSubwiki: wikiSubwikis }).from(wikiSynonyms).where(eq(wikiSynonyms.id, wikiSynonymId)).leftJoin(wikiPages, eq(wikiSynonyms.wikiPageId, wikiPages.id)).leftJoin(wikiSubwikis, eq(wikiSynonyms.wikiSubwikiId, wikiSubwikis.id));
  if (row === undefined) return {};
  const w =  { ...row.wikiSynonym, wikiPage: row.wikiPage, wikiSubwiki: row.wikiSubwiki } ;
  return { wikiSynonym: w };
};


