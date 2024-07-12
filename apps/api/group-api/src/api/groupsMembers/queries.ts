import type { GroupsMemberId } from "@soco/group-db/schema/groupsMembers";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/group-db";
import { db } from "@soco/group-db/client";
import {
  groupsMemberIdSchema,
  groupsMembers,
} from "@soco/group-db/schema/groupsMembers";

export const getGroupsMembers = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(groupsMembers)
    .where(eq(groupsMembers.userId, session?.user.id!));
  const g = rows;
  return { groupsMembers: g };
};

export const getGroupsMemberById = async (id: GroupsMemberId) => {
  const { session } = await getUserAuth();
  const { id: groupsMemberId } = groupsMemberIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(groupsMembers)
    .where(
      and(
        eq(groupsMembers.id, groupsMemberId),
        eq(groupsMembers.userId, session?.user.id!),
      ),
    );
  if (row === undefined) return {};
  const g = row;
  return { groupsMember: g };
};
