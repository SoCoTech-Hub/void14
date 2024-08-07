import type {
  GroupingsGroupId,
  NewGroupingsGroupParams,
  UpdateGroupingsGroupParams,
} from "@soco/group-db/schema/groupingsGroups";
import { eq } from "@soco/group-db";
import { db } from "@soco/group-db/client";
import {
  groupingsGroupIdSchema,
  groupingsGroups,
  insertGroupingsGroupSchema,
  updateGroupingsGroupSchema,
} from "@soco/group-db/schema/groupingsGroups";

export const createGroupingsGroup = async (
  groupingsGroup: NewGroupingsGroupParams,
) => {
  const newGroupingsGroup = insertGroupingsGroupSchema.parse(groupingsGroup);
  try {
    const [g] = await db
      .insert(groupingsGroups)
      .values(newGroupingsGroup)
      .returning();
    return { groupingsGroup: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateGroupingsGroup = async (
  id: GroupingsGroupId,
  groupingsGroup: UpdateGroupingsGroupParams,
) => {
  const { id: groupingsGroupId } = groupingsGroupIdSchema.parse({ id });
  const newGroupingsGroup = updateGroupingsGroupSchema.parse(groupingsGroup);
  try {
    const [g] = await db
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
    const [g] = await db
      .delete(groupingsGroups)
      .where(eq(groupingsGroups.id, groupingsGroupId!))
      .returning();
    return { groupingsGroup: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
