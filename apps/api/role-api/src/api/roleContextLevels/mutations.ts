import { db } from "@soco/role-db/client";
import { eq } from "@soco/role-db";
import { 
  RoleContextLevelId, 
  NewRoleContextLevelParams,
  UpdateRoleContextLevelParams, 
  updateRoleContextLevelSchema,
  insertRoleContextLevelSchema, 
  roleContextLevels,
  roleContextLevelIdSchema 
} from "@soco/role-db/schema/roleContextLevels";

export const createRoleContextLevel = async (roleContextLevel: NewRoleContextLevelParams) => {
  const newRoleContextLevel = insertRoleContextLevelSchema.parse(roleContextLevel);
  try {
    const [r] =  await db.insert(roleContextLevels).values(newRoleContextLevel).returning();
    return { roleContextLevel: r };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateRoleContextLevel = async (id: RoleContextLevelId, roleContextLevel: UpdateRoleContextLevelParams) => {
  const { id: roleContextLevelId } = roleContextLevelIdSchema.parse({ id });
  const newRoleContextLevel = updateRoleContextLevelSchema.parse(roleContextLevel);
  try {
    const [r] =  await db
     .update(roleContextLevels)
     .set(newRoleContextLevel)
     .where(eq(roleContextLevels.id, roleContextLevelId!))
     .returning();
    return { roleContextLevel: r };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteRoleContextLevel = async (id: RoleContextLevelId) => {
  const { id: roleContextLevelId } = roleContextLevelIdSchema.parse({ id });
  try {
    const [r] =  await db.delete(roleContextLevels).where(eq(roleContextLevels.id, roleContextLevelId!))
    .returning();
    return { roleContextLevel: r };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

