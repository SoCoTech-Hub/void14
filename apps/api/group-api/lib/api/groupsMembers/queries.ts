import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import type { GroupsMemberId } from "../db/schema/groupsMembers";
import { db } from "../db/index";
import {
  groupsMemberIdSchema,
  groupsMembers,
} from "../db/schema/groupsMembers";

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
