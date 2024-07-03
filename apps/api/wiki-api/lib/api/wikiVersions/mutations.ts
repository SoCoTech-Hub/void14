import { db } from "@/lib/db/index";
import { and, eq } from "drizzle-orm";
import { 
  WikiVersionId, 
  NewWikiVersionParams,
  UpdateWikiVersionParams, 
  updateWikiVersionSchema,
  insertWikiVersionSchema, 
  wikiVersions,
  wikiVersionIdSchema 
} from "@/lib/db/schema/wikiVersions";
import { getUserAuth } from "@/lib/auth/utils";

export const createWikiVersion = async (wikiVersion: NewWikiVersionParams) => {
  const { session } = await getUserAuth();
  const newWikiVersion = insertWikiVersionSchema.parse({ ...wikiVersion, userId: session?.user.id! });
  try {
    const [w] =  await db.insert(wikiVersions).values(newWikiVersion).returning();
    return { wikiVersion: w };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateWikiVersion = async (id: WikiVersionId, wikiVersion: UpdateWikiVersionParams) => {
  const { session } = await getUserAuth();
  const { id: wikiVersionId } = wikiVersionIdSchema.parse({ id });
  const newWikiVersion = updateWikiVersionSchema.parse({ ...wikiVersion, userId: session?.user.id! });
  try {
    const [w] =  await db
     .update(wikiVersions)
     .set({...newWikiVersion, updatedAt: new Date() })
     .where(and(eq(wikiVersions.id, wikiVersionId!), eq(wikiVersions.userId, session?.user.id!)))
     .returning();
    return { wikiVersion: w };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteWikiVersion = async (id: WikiVersionId) => {
  const { session } = await getUserAuth();
  const { id: wikiVersionId } = wikiVersionIdSchema.parse({ id });
  try {
    const [w] =  await db.delete(wikiVersions).where(and(eq(wikiVersions.id, wikiVersionId!), eq(wikiVersions.userId, session?.user.id!)))
    .returning();
    return { wikiVersion: w };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

