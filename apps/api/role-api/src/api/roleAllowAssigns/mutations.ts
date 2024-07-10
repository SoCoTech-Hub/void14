import { db } from "@soco/role-db/client";
import { eq } from "@soco/role-db";
import { 
  RoleAllowAssignId, 
  NewRoleAllowAssignParams,
  UpdateRoleAllowAssignParams, 
  updateRoleAllowAssignSchema,
  insertRoleAllowAssignSchema, 
  roleAllowAssigns,
  roleAllowAssignIdSchema 
} from "@soco/role-db/schema/roleAllowAssigns";

export const createRoleAllowAssign = async (roleAllowAssign: NewRoleAllowAssignParams) => {
  const newRoleAllowAssign = insertRoleAllowAssignSchema.parse(roleAllowAssign);
  try {
    const [r] =  await db.insert(roleAllowAssigns).values(newRoleAllowAssign).returning();
    return { roleAllowAssign: r };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateRoleAllowAssign = async (id: RoleAllowAssignId, roleAllowAssign: UpdateRoleAllowAssignParams) => {
  const { id: roleAllowAssignId } = roleAllowAssignIdSchema.parse({ id });
  const newRoleAllowAssign = updateRoleAllowAssignSchema.parse(roleAllowAssign);
  try {
    const [r] =  await db
     .update(roleAllowAssigns)
     .set(newRoleAllowAssign)
     .where(eq(roleAllowAssigns.id, roleAllowAssignId!))
     .returning();
    return { roleAllowAssign: r };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteRoleAllowAssign = async (id: RoleAllowAssignId) => {
  const { id: roleAllowAssignId } = roleAllowAssignIdSchema.parse({ id });
  try {
    const [r] =  await db.delete(roleAllowAssigns).where(eq(roleAllowAssigns.id, roleAllowAssignId!))
    .returning();
    return { roleAllowAssign: r };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

