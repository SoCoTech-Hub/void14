import { db } from "@soco/assignment-db/index";
import { and, eq } from "drizzle-orm";
import { 
  AssignUserMappingId, 
  NewAssignUserMappingParams,
  UpdateAssignUserMappingParams, 
  updateAssignUserMappingSchema,
  insertAssignUserMappingSchema, 
  assignUserMappings,
  assignUserMappingIdSchema 
} from "@soco/assignment-db/schema/assignUserMappings";
import { getUserAuth } from "@/lib/auth/utils";

export const createAssignUserMapping = async (assignUserMapping: NewAssignUserMappingParams) => {
  const { session } = await getUserAuth();
  const newAssignUserMapping = insertAssignUserMappingSchema.parse({ ...assignUserMapping, userId: session?.user.id! });
  try {
    const [a] =  await db.insert(assignUserMappings).values(newAssignUserMapping).returning();
    return { assignUserMapping: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateAssignUserMapping = async (id: AssignUserMappingId, assignUserMapping: UpdateAssignUserMappingParams) => {
  const { session } = await getUserAuth();
  const { id: assignUserMappingId } = assignUserMappingIdSchema.parse({ id });
  const newAssignUserMapping = updateAssignUserMappingSchema.parse({ ...assignUserMapping, userId: session?.user.id! });
  try {
    const [a] =  await db
     .update(assignUserMappings)
     .set(newAssignUserMapping)
     .where(and(eq(assignUserMappings.id, assignUserMappingId!), eq(assignUserMappings.userId, session?.user.id!)))
     .returning();
    return { assignUserMapping: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteAssignUserMapping = async (id: AssignUserMappingId) => {
  const { session } = await getUserAuth();
  const { id: assignUserMappingId } = assignUserMappingIdSchema.parse({ id });
  try {
    const [a] =  await db.delete(assignUserMappings).where(and(eq(assignUserMappings.id, assignUserMappingId!), eq(assignUserMappings.userId, session?.user.id!)))
    .returning();
    return { assignUserMapping: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

