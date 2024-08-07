import { db } from "@/lib/db/index";
import { and, eq } from "drizzle-orm";
import { 
  type RoleAssignmentId, 
  type NewRoleAssignmentParams,
  type UpdateRoleAssignmentParams, 
  updateRoleAssignmentSchema,
  insertRoleAssignmentSchema, 
  roleAssignments,
  roleAssignmentIdSchema 
} from "@/lib/db/schema/roleAssignments";
import { getUserAuth } from "@/lib/auth/utils";

export const createRoleAssignment = async (roleAssignment: NewRoleAssignmentParams) => {
  const { session } = await getUserAuth();
  const newRoleAssignment = insertRoleAssignmentSchema.parse({ ...roleAssignment, userId: session?.user.id! });
  try {
    const [r] =  await db.insert(roleAssignments).values(newRoleAssignment).returning();
    return { roleAssignment: r };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateRoleAssignment = async (id: RoleAssignmentId, roleAssignment: UpdateRoleAssignmentParams) => {
  const { session } = await getUserAuth();
  const { id: roleAssignmentId } = roleAssignmentIdSchema.parse({ id });
  const newRoleAssignment = updateRoleAssignmentSchema.parse({ ...roleAssignment, userId: session?.user.id! });
  try {
    const [r] =  await db
     .update(roleAssignments)
     .set({...newRoleAssignment, updatedAt: new Date() })
     .where(and(eq(roleAssignments.id, roleAssignmentId!), eq(roleAssignments.userId, session?.user.id!)))
     .returning();
    return { roleAssignment: r };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteRoleAssignment = async (id: RoleAssignmentId) => {
  const { session } = await getUserAuth();
  const { id: roleAssignmentId } = roleAssignmentIdSchema.parse({ id });
  try {
    const [r] =  await db.delete(roleAssignments).where(and(eq(roleAssignments.id, roleAssignmentId!), eq(roleAssignments.userId, session?.user.id!)))
    .returning();
    return { roleAssignment: r };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

