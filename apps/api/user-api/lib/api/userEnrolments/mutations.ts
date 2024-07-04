import { db } from "@/lib/db/index";
import { and, eq } from "drizzle-orm";
import { 
  UserEnrolmentId, 
  NewUserEnrolmentParams,
  UpdateUserEnrolmentParams, 
  updateUserEnrolmentSchema,
  insertUserEnrolmentSchema, 
  userEnrolments,
  userEnrolmentIdSchema 
} from "@/lib/db/schema/userEnrolments";
import { getUserAuth } from "@soco/auth/utils";

export const createUserEnrolment = async (userEnrolment: NewUserEnrolmentParams) => {
  const { session } = await getUserAuth();
  const newUserEnrolment = insertUserEnrolmentSchema.parse({ ...userEnrolment, userId: session?.user.id! });
  try {
    const [u] =  await db.insert(userEnrolments).values(newUserEnrolment).returning();
    return { userEnrolment: u };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateUserEnrolment = async (id: UserEnrolmentId, userEnrolment: UpdateUserEnrolmentParams) => {
  const { session } = await getUserAuth();
  const { id: userEnrolmentId } = userEnrolmentIdSchema.parse({ id });
  const newUserEnrolment = updateUserEnrolmentSchema.parse({ ...userEnrolment, userId: session?.user.id! });
  try {
    const [u] =  await db
     .update(userEnrolments)
     .set({...newUserEnrolment, updatedAt: new Date() })
     .where(and(eq(userEnrolments.id, userEnrolmentId!), eq(userEnrolments.userId, session?.user.id!)))
     .returning();
    return { userEnrolment: u };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteUserEnrolment = async (id: UserEnrolmentId) => {
  const { session } = await getUserAuth();
  const { id: userEnrolmentId } = userEnrolmentIdSchema.parse({ id });
  try {
    const [u] =  await db.delete(userEnrolments).where(and(eq(userEnrolments.id, userEnrolmentId!), eq(userEnrolments.userId, session?.user.id!)))
    .returning();
    return { userEnrolment: u };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

