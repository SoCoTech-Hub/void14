import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type GroupId, groupIdSchema, groups } from "@/lib/db/schema/groups";

export const getGroups = async () => {
  const rows = await db.select().from(groups);
  const g = rows
  return { groups: g };
};

export const getGroupById = async (id: GroupId) => {
  const { id: groupId } = groupIdSchema.parse({ id });
  const [row] = await db.select().from(groups).where(eq(groups.id, groupId));
  if (row === undefined) return {};
  const g = row;
  return { group: g };
};


