import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type WikiLinkId, wikiLinkIdSchema, wikiLinks } from "@/lib/db/schema/wikiLinks";
import { wikiPages } from "@/lib/db/schema/wikiPages";
import { wikiPages } from "@/lib/db/schema/wikiPages";
import { wikiPages } from "@/lib/db/schema/wikiPages";
import { wikiPages } from "@/lib/db/schema/wikiPages";

export const getWikiLinks = async () => {
  const rows = await db.select({ wikiLink: wikiLinks, wikiPage: wikiPages, wikiPage: wikiPages, wikiPage: wikiPages, wikiPage: wikiPages }).from(wikiLinks).leftJoin(wikiPages, eq(wikiLinks.wikiPageId, wikiPages.id)).leftJoin(wikiPages, eq(wikiLinks.wikiPageId, wikiPages.id)).leftJoin(wikiPages, eq(wikiLinks.wikiPageId, wikiPages.id)).leftJoin(wikiPages, eq(wikiLinks.wikiPageId, wikiPages.id));
  const w = rows .map((r) => ({ ...r.wikiLink, wikiPage: r.wikiPage, wikiPage: r.wikiPage, wikiPage: r.wikiPage, wikiPage: r.wikiPage})); 
  return { wikiLinks: w };
};

export const getWikiLinkById = async (id: WikiLinkId) => {
  const { id: wikiLinkId } = wikiLinkIdSchema.parse({ id });
  const [row] = await db.select({ wikiLink: wikiLinks, wikiPage: wikiPages, wikiPage: wikiPages, wikiPage: wikiPages, wikiPage: wikiPages }).from(wikiLinks).where(eq(wikiLinks.id, wikiLinkId)).leftJoin(wikiPages, eq(wikiLinks.wikiPageId, wikiPages.id)).leftJoin(wikiPages, eq(wikiLinks.wikiPageId, wikiPages.id)).leftJoin(wikiPages, eq(wikiLinks.wikiPageId, wikiPages.id)).leftJoin(wikiPages, eq(wikiLinks.wikiPageId, wikiPages.id));
  if (row === undefined) return {};
  const w =  { ...row.wikiLink, wikiPage: row.wikiPage, wikiPage: row.wikiPage, wikiPage: row.wikiPage, wikiPage: row.wikiPage } ;
  return { wikiLink: w };
};


