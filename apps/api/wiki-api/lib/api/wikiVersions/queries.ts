import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@soco/auth/utils";
import { type WikiVersionId, wikiVersionIdSchema, wikiVersions } from "@/lib/db/schema/wikiVersions";
import { wikiPages } from "@/lib/db/schema/wikiPages";

export const getWikiVersions = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select({ wikiVersion: wikiVersions, wikiPage: wikiPages }).from(wikiVersions).leftJoin(wikiPages, eq(wikiVersions.wikiPageId, wikiPages.id)).where(eq(wikiVersions.userId, session?.user.id!));
  const w = rows .map((r) => ({ ...r.wikiVersion, wikiPage: r.wikiPage})); 
  return { wikiVersions: w };
};

export const getWikiVersionById = async (id: WikiVersionId) => {
  const { session } = await getUserAuth();
  const { id: wikiVersionId } = wikiVersionIdSchema.parse({ id });
  const [row] = await db.select({ wikiVersion: wikiVersions, wikiPage: wikiPages }).from(wikiVersions).where(and(eq(wikiVersions.id, wikiVersionId), eq(wikiVersions.userId, session?.user.id!))).leftJoin(wikiPages, eq(wikiVersions.wikiPageId, wikiPages.id));
  if (row === undefined) return {};
  const w =  { ...row.wikiVersion, wikiPage: row.wikiPage } ;
  return { wikiVersion: w };
};


