import { db } from "@soco/group-db/client";
import { and, eq } from "@soco/group-db";
import { 
  GroupsMemberId, 
  NewGroupsMemberParams,
  UpdateGroupsMemberParams, 
  updateGroupsMemberSchema,
  insertGroupsMemberSchema, 
  groupsMembers,
  groupsMemberIdSchema 
} from "@soco/group-db/schema/groupsMembers";
import { getUserAuth } from "@/lib/auth/utils";

export const createGroupsMember = async (groupsMember: NewGroupsMemberParams) => {
  const { session } = await getUserAuth();
  const newGroupsMember = insertGroupsMemberSchema.parse({ ...groupsMember, userId: session?.user.id! });
  try {
    const [g] =  await db.insert(groupsMembers).values(newGroupsMember).returning();
    return { groupsMember: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateGroupsMember = async (id: GroupsMemberId, groupsMember: UpdateGroupsMemberParams) => {
  const { session } = await getUserAuth();
  const { id: groupsMemberId } = groupsMemberIdSchema.parse({ id });
  const newGroupsMember = updateGroupsMemberSchema.parse({ ...groupsMember, userId: session?.user.id! });
  try {
    const [g] =  await db
     .update(groupsMembers)
     .set(newGroupsMember)
     .where(and(eq(groupsMembers.id, groupsMemberId!), eq(groupsMembers.userId, session?.user.id!)))
     .returning();
    return { groupsMember: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteGroupsMember = async (id: GroupsMemberId) => {
  const { session } = await getUserAuth();
  const { id: groupsMemberId } = groupsMemberIdSchema.parse({ id });
  try {
    const [g] =  await db.delete(groupsMembers).where(and(eq(groupsMembers.id, groupsMemberId!), eq(groupsMembers.userId, session?.user.id!)))
    .returning();
    return { groupsMember: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

