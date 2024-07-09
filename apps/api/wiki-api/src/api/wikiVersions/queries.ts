import { and, eq } from "drizzle-orm";

import type { WikiVersionId } from "@soco/wiki-db/schema/wikiVersions";
import { getUserAuth } from "@soco/auth-services";
import { db } from "@soco/wiki-db/index";
import { wikiPages } from "@soco/wiki-db/schema/wikiPages";
import {
  wikiVersionIdSchema,
  wikiVersions,
} from "@soco/wiki-db/schema/wikiVersions";

export const getWikiVersions = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select({ wikiVersion: wikiVersions, wikiPage: wikiPages })
    .from(wikiVersions)
    .leftJoin(wikiPages, eq(wikiVersions.wikiPageId, wikiPages.id))
    .where(eq(wikiVersions.userId, session?.user.id!));
  const w = rows.map((r) => ({ ...r.wikiVersion, wikiPage: r.wikiPage }));
  return { wikiVersions: w };
};

export const getWikiVersionById = async (id: WikiVersionId) => {
  const { session } = await getUserAuth();
  const { id: wikiVersionId } = wikiVersionIdSchema.parse({ id });
  const [row] = await db
    .select({ wikiVersion: wikiVersions, wikiPage: wikiPages })
    .from(wikiVersions)
    .where(
      and(
        eq(wikiVersions.id, wikiVersionId),
        eq(wikiVersions.userId, session?.user.id!),
      ),
    )
    .leftJoin(wikiPages, eq(wikiVersions.wikiPageId, wikiPages.id));
  if (row === undefined) return {};
  const w = { ...row.wikiVersion, wikiPage: row.wikiPage };
  return { wikiVersion: w };
};
