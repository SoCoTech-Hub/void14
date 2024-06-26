import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { type TagInstanceId, tagInstanceIdSchema, tagInstances } from "@/lib/db/schema/tagInstances";
import { tags } from "@/lib/db/schema/tags";

export const getTagInstances = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select({ tagInstance: tagInstances, tag: tags }).from(tagInstances).leftJoin(tags, eq(tagInstances.tagId, tags.id)).where(eq(tagInstances.userId, session?.user.id!));
  const t = rows .map((r) => ({ ...r.tagInstance, tag: r.tag})); 
  return { tagInstances: t };
};

export const getTagInstanceById = async (id: TagInstanceId) => {
  const { session } = await getUserAuth();
  const { id: tagInstanceId } = tagInstanceIdSchema.parse({ id });
  const [row] = await db.select({ tagInstance: tagInstances, tag: tags }).from(tagInstances).where(and(eq(tagInstances.id, tagInstanceId), eq(tagInstances.userId, session?.user.id!))).leftJoin(tags, eq(tagInstances.tagId, tags.id));
  if (row === undefined) return {};
  const t =  { ...row.tagInstance, tag: row.tag } ;
  return { tagInstance: t };
};


