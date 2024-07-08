import { db } from "@soco/wiki-db/index";
import { eq } from "drizzle-orm";
import { 
  WikiLinkId, 
  NewWikiLinkParams,
  UpdateWikiLinkParams, 
  updateWikiLinkSchema,
  insertWikiLinkSchema, 
  wikiLinks,
  wikiLinkIdSchema 
} from "@soco/wiki-db/schema/wikiLinks";

export const createWikiLink = async (wikiLink: NewWikiLinkParams) => {
  const newWikiLink = insertWikiLinkSchema.parse(wikiLink);
  try {
    const [w] =  await db.insert(wikiLinks).values(newWikiLink).returning();
    return { wikiLink: w };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateWikiLink = async (id: WikiLinkId, wikiLink: UpdateWikiLinkParams) => {
  const { id: wikiLinkId } = wikiLinkIdSchema.parse({ id });
  const newWikiLink = updateWikiLinkSchema.parse(wikiLink);
  try {
    const [w] =  await db
     .update(wikiLinks)
     .set(newWikiLink)
     .where(eq(wikiLinks.id, wikiLinkId!))
     .returning();
    return { wikiLink: w };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteWikiLink = async (id: WikiLinkId) => {
  const { id: wikiLinkId } = wikiLinkIdSchema.parse({ id });
  try {
    const [w] =  await db.delete(wikiLinks).where(eq(wikiLinks.id, wikiLinkId!))
    .returning();
    return { wikiLink: w };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

