import type { GroupId } from "@soco/group-db/schema/groups";
import { eq } from "@soco/group-db";
import { db } from "@soco/group-db/client";
import { groupIdSchema, groups } from "@soco/group-db/schema/groups";

export const getGroups = async () => {
  const rows = await db.select().from(groups);
  const g = rows;
  return { groups: g };
};

export const getGroupById = async (id: GroupId) => {
  const { id: groupId } = groupIdSchema.parse({ id });
  const [row] = await db.select().from(groups).where(eq(groups.id, groupId));
  if (row === undefined) return {};
  const g = row;
  return { group: g };
};
