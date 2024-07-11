import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/role-db";
import { db } from "@soco/role-db/client";
import {
  insertRoleCapabilitySchema,
  NewRoleCapabilityParams,
  roleCapabilities,
  RoleCapabilityId,
  roleCapabilityIdSchema,
  UpdateRoleCapabilityParams,
  updateRoleCapabilitySchema,
} from "@soco/role-db/schema/roleCapabilities";

export const createRoleCapability = async (
  roleCapability: NewRoleCapabilityParams,
) => {
  const { session } = await getUserAuth();
  const newRoleCapability = insertRoleCapabilitySchema.parse({
    ...roleCapability,
    userId: session?.user.id!,
  });
  try {
    const [r] = await db
      .insert(roleCapabilities)
      .values(newRoleCapability)
      .returning();
    return { roleCapability: r };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateRoleCapability = async (
  id: RoleCapabilityId,
  roleCapability: UpdateRoleCapabilityParams,
) => {
  const { session } = await getUserAuth();
  const { id: roleCapabilityId } = roleCapabilityIdSchema.parse({ id });
  const newRoleCapability = updateRoleCapabilitySchema.parse({
    ...roleCapability,
    userId: session?.user.id!,
  });
  try {
    const [r] = await db
      .update(roleCapabilities)
      .set({ ...newRoleCapability, updatedAt: new Date() })
      .where(
        and(
          eq(roleCapabilities.id, roleCapabilityId!),
          eq(roleCapabilities.userId, session?.user.id!),
        ),
      )
      .returning();
    return { roleCapability: r };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteRoleCapability = async (id: RoleCapabilityId) => {
  const { session } = await getUserAuth();
  const { id: roleCapabilityId } = roleCapabilityIdSchema.parse({ id });
  try {
    const [r] = await db
      .delete(roleCapabilities)
      .where(
        and(
          eq(roleCapabilities.id, roleCapabilityId!),
          eq(roleCapabilities.userId, session?.user.id!),
        ),
      )
      .returning();
    return { roleCapability: r };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
