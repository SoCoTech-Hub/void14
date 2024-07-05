import { eq } from "drizzle-orm";

import type { TagAreaId } from "../../db/schema/tagAreas";
import { db } from "../../db/index";
import { tagAreaIdSchema, tagAreas } from "../../db/schema/tagAreas";
import { tagColls } from "../../db/schema/tagColls";

export const getTagAreas = async () => {
  const rows = await db
    .select({ tagArea: tagAreas, tagColl: tagColls })
    .from(tagAreas)
    .leftJoin(tagColls, eq(tagAreas.tagCollId, tagColls.id));
  const t = rows.map((r) => ({ ...r.tagArea, tagColl: r.tagColl }));
  return { tagAreas: t };
};

export const getTagAreaById = async (id: TagAreaId) => {
  const { id: tagAreaId } = tagAreaIdSchema.parse({ id });
  const [row] = await db
    .select({ tagArea: tagAreas, tagColl: tagColls })
    .from(tagAreas)
    .where(eq(tagAreas.id, tagAreaId))
    .leftJoin(tagColls, eq(tagAreas.tagCollId, tagColls.id));
  if (row === undefined) return {};
  const t = { ...row.tagArea, tagColl: row.tagColl };
  return { tagArea: t };
};
