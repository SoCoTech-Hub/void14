import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { type GroupsMemberId, groupsMemberIdSchema, groupsMembers } from "@/lib/db/schema/groupsMembers";

export const getGroupsMembers = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select().from(groupsMembers).where(eq(groupsMembers.userId, session?.user.id!));
  const g = rows
  return { groupsMembers: g };
};

export const getGroupsMemberById = async (id: GroupsMemberId) => {
  const { session } = await getUserAuth();
  const { id: groupsMemberId } = groupsMemberIdSchema.parse({ id });
  const [row] = await db.select().from(groupsMembers).where(and(eq(groupsMembers.id, groupsMemberId), eq(groupsMembers.userId, session?.user.id!)));
  if (row === undefined) return {};
  const g = row;
  return { groupsMember: g };
};


