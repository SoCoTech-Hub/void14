import { db } from "@soco/role-db/client";
import { eq } from "@soco/role-db";
import { 
  type RoleAllowOverrideId, 
  type NewRoleAllowOverrideParams,
  type UpdateRoleAllowOverrideParams, 
  updateRoleAllowOverrideSchema,
  insertRoleAllowOverrideSchema, 
  roleAllowOverrides,
  roleAllowOverrideIdSchema 
} from "@soco/role-db/schema/roleAllowOverrides";

export const createRoleAllowOverride = async (roleAllowOverride: NewRoleAllowOverrideParams) => {
  const newRoleAllowOverride = insertRoleAllowOverrideSchema.parse(roleAllowOverride);
  try {
    const [r] =  await db.insert(roleAllowOverrides).values(newRoleAllowOverride).returning();
    return { roleAllowOverride: r };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateRoleAllowOverride = async (id: RoleAllowOverrideId, roleAllowOverride: UpdateRoleAllowOverrideParams) => {
  const { id: roleAllowOverrideId } = roleAllowOverrideIdSchema.parse({ id });
  const newRoleAllowOverride = updateRoleAllowOverrideSchema.parse(roleAllowOverride);
  try {
    const [r] =  await db
     .update(roleAllowOverrides)
     .set(newRoleAllowOverride)
     .where(eq(roleAllowOverrides.id, roleAllowOverrideId!))
     .returning();
    return { roleAllowOverride: r };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteRoleAllowOverride = async (id: RoleAllowOverrideId) => {
  const { id: roleAllowOverrideId } = roleAllowOverrideIdSchema.parse({ id });
  try {
    const [r] =  await db.delete(roleAllowOverrides).where(eq(roleAllowOverrides.id, roleAllowOverrideId!))
    .returning();
    return { roleAllowOverride: r };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

