import { db } from "@/lib/db/index";
import { and, eq } from "drizzle-orm";
import { 
  type UserPasswordResetId, 
  type NewUserPasswordResetParams,
  type UpdateUserPasswordResetParams, 
  updateUserPasswordResetSchema,
  insertUserPasswordResetSchema, 
  userPasswordResets,
  userPasswordResetIdSchema 
} from "@/lib/db/schema/userPasswordResets";
import { getUserAuth } from "@/lib/auth/utils";

export const createUserPasswordReset = async (userPasswordReset: NewUserPasswordResetParams) => {
  const { session } = await getUserAuth();
  const newUserPasswordReset = insertUserPasswordResetSchema.parse({ ...userPasswordReset, userId: session?.user.id! });
  try {
    const [u] =  await db.insert(userPasswordResets).values(newUserPasswordReset).returning();
    return { userPasswordReset: u };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateUserPasswordReset = async (id: UserPasswordResetId, userPasswordReset: UpdateUserPasswordResetParams) => {
  const { session } = await getUserAuth();
  const { id: userPasswordResetId } = userPasswordResetIdSchema.parse({ id });
  const newUserPasswordReset = updateUserPasswordResetSchema.parse({ ...userPasswordReset, userId: session?.user.id! });
  try {
    const [u] =  await db
     .update(userPasswordResets)
     .set({...newUserPasswordReset, updatedAt: new Date() })
     .where(and(eq(userPasswordResets.id, userPasswordResetId!), eq(userPasswordResets.userId, session?.user.id!)))
     .returning();
    return { userPasswordReset: u };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteUserPasswordReset = async (id: UserPasswordResetId) => {
  const { session } = await getUserAuth();
  const { id: userPasswordResetId } = userPasswordResetIdSchema.parse({ id });
  try {
    const [u] =  await db.delete(userPasswordResets).where(and(eq(userPasswordResets.id, userPasswordResetId!), eq(userPasswordResets.userId, session?.user.id!)))
    .returning();
    return { userPasswordReset: u };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

