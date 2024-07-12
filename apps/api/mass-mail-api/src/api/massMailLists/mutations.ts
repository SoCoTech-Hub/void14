import { db } from "@soco/mass-mail-db/client";
import { and, eq } from "@soco/mass-mail-db";
import { 
  type MassMailListId, 
  type NewMassMailListParams,
  type UpdateMassMailListParams, 
  updateMassMailListSchema,
  insertMassMailListSchema, 
  massMailLists,
  massMailListIdSchema 
} from "@soco/mass-mail-db/schema/massMailLists";
import { getUserAuth } from "@soco/auth-service";

export const createMassMailList = async (massMailList: NewMassMailListParams) => {
  const { session } = await getUserAuth();
  const newMassMailList = insertMassMailListSchema.parse({ ...massMailList, userId: session?.user.id! });
  try {
    const [m] =  await db.insert(massMailLists).values(newMassMailList).returning();
    return { massMailList: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateMassMailList = async (id: MassMailListId, massMailList: UpdateMassMailListParams) => {
  const { session } = await getUserAuth();
  const { id: massMailListId } = massMailListIdSchema.parse({ id });
  const newMassMailList = updateMassMailListSchema.parse({ ...massMailList, userId: session?.user.id! });
  try {
    const [m] =  await db
     .update(massMailLists)
     .set({...newMassMailList, updatedAt: new Date() })
     .where(and(eq(massMailLists.id, massMailListId!), eq(massMailLists.userId, session?.user.id!)))
     .returning();
    return { massMailList: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteMassMailList = async (id: MassMailListId) => {
  const { session } = await getUserAuth();
  const { id: massMailListId } = massMailListIdSchema.parse({ id });
  try {
    const [m] =  await db.delete(massMailLists).where(and(eq(massMailLists.id, massMailListId!), eq(massMailLists.userId, session?.user.id!)))
    .returning();
    return { massMailList: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

