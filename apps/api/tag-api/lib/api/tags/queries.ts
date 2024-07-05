import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import type { TagId } from "../../db/schema/tags";
import { db } from "../../db/index";
import { tagColls } from "../../db/schema/tagColls";
import { tagIdSchema, tags } from "../../db/schema/tags";

export const getTags = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select({ tag: tags, tagColl: tagColls })
    .from(tags)
    .leftJoin(tagColls, eq(tags.tagCollId, tagColls.id))
    .where(eq(tags.userId, session?.user.id!));
  const t = rows.map((r) => ({ ...r.tag, tagColl: r.tagColl }));
  return { tags: t };
};

export const getTagById = async (id: TagId) => {
  const { session } = await getUserAuth();
  const { id: tagId } = tagIdSchema.parse({ id });
  const [row] = await db
    .select({ tag: tags, tagColl: tagColls })
    .from(tags)
    .where(and(eq(tags.id, tagId), eq(tags.userId, session?.user.id!)))
    .leftJoin(tagColls, eq(tags.tagCollId, tagColls.id));
  if (row === undefined) return {};
  const t = { ...row.tag, tagColl: row.tagColl };
  return { tag: t };
};
