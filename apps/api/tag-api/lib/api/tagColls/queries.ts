import { eq } from "drizzle-orm";

import type { TagCollId } from "../../db/schema/tagColls";
import { db } from "../../db/index";
import { tagCollIdSchema, tagColls } from "../../db/schema/tagColls";

export const getTagColls = async () => {
  const rows = await db.select().from(tagColls);
  const t = rows;
  return { tagColls: t };
};

export const getTagCollById = async (id: TagCollId) => {
  const { id: tagCollId } = tagCollIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(tagColls)
    .where(eq(tagColls.id, tagCollId));
  if (row === undefined) return {};
  const t = row;
  return { tagColl: t };
};
