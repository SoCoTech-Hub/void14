import { eq } from "drizzle-orm";

import type { WikiId } from "../../db/schema/wikis";
import { db } from "../../db/index";
import { wikiIdSchema, wikis } from "../../db/schema/wikis";

export const getWikis = async () => {
  const rows = await db.select().from(wikis);
  const w = rows;
  return { wikis: w };
};

export const getWikiById = async (id: WikiId) => {
  const { id: wikiId } = wikiIdSchema.parse({ id });
  const [row] = await db.select().from(wikis).where(eq(wikis.id, wikiId));
  if (row === undefined) return {};
  const w = row;
  return { wiki: w };
};
