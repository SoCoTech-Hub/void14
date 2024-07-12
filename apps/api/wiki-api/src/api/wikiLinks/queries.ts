import type { WikiLinkId } from "@soco/wiki-db/schema/wikiLinks";
import { eq } from "@soco/wiki-db";
import { db } from "@soco/wiki-db/client";
import { wikiLinkIdSchema, wikiLinks } from "@soco/wiki-db/schema/wikiLinks";
import { wikiPages } from "@soco/wiki-db/schema/wikiPages";

export const getWikiLinks = async () => {
  const rows = await db
    .select({ wikiLink: wikiLinks, wikiPage: wikiPages })
    .from(wikiLinks)
    .leftJoin(wikiPages, eq(wikiLinks.wikiPageId, wikiPages.id))
    .leftJoin(wikiPages, eq(wikiLinks.wikiPageId, wikiPages.id))
    .leftJoin(wikiPages, eq(wikiLinks.wikiPageId, wikiPages.id))
    .leftJoin(wikiPages, eq(wikiLinks.wikiPageId, wikiPages.id));
  const w = rows.map((r) => ({ ...r.wikiLink, wikiPage: r.wikiPage }));
  return { wikiLinks: w };
};

export const getWikiLinkById = async (id: WikiLinkId) => {
  const { id: wikiLinkId } = wikiLinkIdSchema.parse({ id });
  const [row] = await db
    .select({ wikiLink: wikiLinks, wikiPage: wikiPages })
    .from(wikiLinks)
    .where(eq(wikiLinks.id, wikiLinkId))
    .leftJoin(wikiPages, eq(wikiLinks.wikiPageId, wikiPages.id))
    .leftJoin(wikiPages, eq(wikiLinks.wikiPageId, wikiPages.id))
    .leftJoin(wikiPages, eq(wikiLinks.wikiPageId, wikiPages.id))
    .leftJoin(wikiPages, eq(wikiLinks.wikiPageId, wikiPages.id));
  if (row === undefined) return {};
  const w = { ...row.wikiLink, wikiPage: row.wikiPage };
  return { wikiLink: w };
};
