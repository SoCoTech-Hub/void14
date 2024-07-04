import { db } from "@/lib/db/index";
import { and, eq } from "drizzle-orm";
import { 
  UserLastAccessId, 
  NewUserLastAccessParams,
  UpdateUserLastAccessParams, 
  updateUserLastAccessSchema,
  insertUserLastAccessSchema, 
  userLastAccesses,
  userLastAccessIdSchema 
} from "@/lib/db/schema/userLastAccesses";
import { getUserAuth } from "@soco/auth/utils";

export const createUserLastAccess = async (userLastAccess: NewUserLastAccessParams) => {
  const { session } = await getUserAuth();
  const newUserLastAccess = insertUserLastAccessSchema.parse({ ...userLastAccess, userId: session?.user.id! });
  try {
    const [u] =  await db.insert(userLastAccesses).values(newUserLastAccess).returning();
    return { userLastAccess: u };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateUserLastAccess = async (id: UserLastAccessId, userLastAccess: UpdateUserLastAccessParams) => {
  const { session } = await getUserAuth();
  const { id: userLastAccessId } = userLastAccessIdSchema.parse({ id });
  const newUserLastAccess = updateUserLastAccessSchema.parse({ ...userLastAccess, userId: session?.user.id! });
  try {
    const [u] =  await db
     .update(userLastAccesses)
     .set({...newUserLastAccess, updatedAt: new Date() })
     .where(and(eq(userLastAccesses.id, userLastAccessId!), eq(userLastAccesses.userId, session?.user.id!)))
     .returning();
    return { userLastAccess: u };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteUserLastAccess = async (id: UserLastAccessId) => {
  const { session } = await getUserAuth();
  const { id: userLastAccessId } = userLastAccessIdSchema.parse({ id });
  try {
    const [u] =  await db.delete(userLastAccesses).where(and(eq(userLastAccesses.id, userLastAccessId!), eq(userLastAccesses.userId, session?.user.id!)))
    .returning();
    return { userLastAccess: u };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

