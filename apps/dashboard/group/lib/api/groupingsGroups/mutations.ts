import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  type GroupingsGroupId, 
  type NewGroupingsGroupParams,
  type UpdateGroupingsGroupParams, 
  updateGroupingsGroupSchema,
  insertGroupingsGroupSchema, 
  groupingsGroups,
  groupingsGroupIdSchema 
} from "@/lib/db/schema/groupingsGroups";

export const createGroupingsGroup = async (groupingsGroup: NewGroupingsGroupParams) => {
  const newGroupingsGroup = insertGroupingsGroupSchema.parse(groupingsGroup);
  try {
    const [g] =  await db.insert(groupingsGroups).values(newGroupingsGroup).returning();
    return { groupingsGroup: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateGroupingsGroup = async (id: GroupingsGroupId, groupingsGroup: UpdateGroupingsGroupParams) => {
  const { id: groupingsGroupId } = groupingsGroupIdSchema.parse({ id });
  const newGroupingsGroup = updateGroupingsGroupSchema.parse(groupingsGroup);
  try {
    const [g] =  await db
     .update(groupingsGroups)
     .set(newGroupingsGroup)
     .where(eq(groupingsGroups.id, groupingsGroupId!))
     .returning();
    return { groupingsGroup: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteGroupingsGroup = async (id: GroupingsGroupId) => {
  const { id: groupingsGroupId } = groupingsGroupIdSchema.parse({ id });
  try {
    const [g] =  await db.delete(groupingsGroups).where(eq(groupingsGroups.id, groupingsGroupId!))
    .returning();
    return { groupingsGroup: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

