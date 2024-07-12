import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  type RoleAllowSwitchId, 
  type NewRoleAllowSwitchParams,
  type UpdateRoleAllowSwitchParams, 
  updateRoleAllowSwitchSchema,
  insertRoleAllowSwitchSchema, 
  roleAllowSwitches,
  roleAllowSwitchIdSchema 
} from "@/lib/db/schema/roleAllowSwitches";

export const createRoleAllowSwitch = async (roleAllowSwitch: NewRoleAllowSwitchParams) => {
  const newRoleAllowSwitch = insertRoleAllowSwitchSchema.parse(roleAllowSwitch);
  try {
    const [r] =  await db.insert(roleAllowSwitches).values(newRoleAllowSwitch).returning();
    return { roleAllowSwitch: r };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateRoleAllowSwitch = async (id: RoleAllowSwitchId, roleAllowSwitch: UpdateRoleAllowSwitchParams) => {
  const { id: roleAllowSwitchId } = roleAllowSwitchIdSchema.parse({ id });
  const newRoleAllowSwitch = updateRoleAllowSwitchSchema.parse(roleAllowSwitch);
  try {
    const [r] =  await db
     .update(roleAllowSwitches)
     .set(newRoleAllowSwitch)
     .where(eq(roleAllowSwitches.id, roleAllowSwitchId!))
     .returning();
    return { roleAllowSwitch: r };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteRoleAllowSwitch = async (id: RoleAllowSwitchId) => {
  const { id: roleAllowSwitchId } = roleAllowSwitchIdSchema.parse({ id });
  try {
    const [r] =  await db.delete(roleAllowSwitches).where(eq(roleAllowSwitches.id, roleAllowSwitchId!))
    .returning();
    return { roleAllowSwitch: r };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

