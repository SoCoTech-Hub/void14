import { eq } from "drizzle-orm";

import type { GroupId } from "../db/schema/groups";
import { db } from "../db/index";
import { groupIdSchema, groups } from "../db/schema/groups";

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
