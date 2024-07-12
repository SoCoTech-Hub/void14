import { db } from "@soco/tag-db/client";
import { eq, and } from "@soco/tag-db";
import { getUserAuth } from "@soco/auth-service";
import { type TagId, tagIdSchema, tags } from "@soco/tag-db/schema/tags";
import { tagColls } from "@soco/tag-db/schema/tagColls";

export const getTags = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select({ tag: tags, tagColl: tagColls }).from(tags).leftJoin(tagColls, eq(tags.tagCollId, tagColls.id)).where(eq(tags.userId, session?.user.id!));
  const t = rows .map((r) => ({ ...r.tag, tagColl: r.tagColl})); 
  return { tags: t };
};

export const getTagById = async (id: TagId) => {
  const { session } = await getUserAuth();
  const { id: tagId } = tagIdSchema.parse({ id });
  const [row] = await db.select({ tag: tags, tagColl: tagColls }).from(tags).where(and(eq(tags.id, tagId), eq(tags.userId, session?.user.id!))).leftJoin(tagColls, eq(tags.tagCollId, tagColls.id));
  if (row === undefined) return {};
  const t =  { ...row.tag, tagColl: row.tagColl } ;
  return { tag: t };
};


