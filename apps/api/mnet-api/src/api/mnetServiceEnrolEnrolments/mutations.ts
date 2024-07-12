import { db } from "@soco/mnet-db/client";
import { and, eq } from "@soco/mnet-db";
import { 
  type MnetServiceEnrolEnrolmentId, 
  type NewMnetServiceEnrolEnrolmentParams,
  type UpdateMnetServiceEnrolEnrolmentParams, 
  updateMnetServiceEnrolEnrolmentSchema,
  insertMnetServiceEnrolEnrolmentSchema, 
  mnetServiceEnrolEnrolments,
  mnetServiceEnrolEnrolmentIdSchema 
} from "@soco/mnet-db/schema/mnetServiceEnrolEnrolments";
import { getUserAuth } from "@soco/auth-service";

export const createMnetServiceEnrolEnrolment = async (mnetServiceEnrolEnrolment: NewMnetServiceEnrolEnrolmentParams) => {
  const { session } = await getUserAuth();
  const newMnetServiceEnrolEnrolment = insertMnetServiceEnrolEnrolmentSchema.parse({ ...mnetServiceEnrolEnrolment, userId: session?.user.id! });
  try {
    const [m] =  await db.insert(mnetServiceEnrolEnrolments).values(newMnetServiceEnrolEnrolment).returning();
    return { mnetServiceEnrolEnrolment: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateMnetServiceEnrolEnrolment = async (id: MnetServiceEnrolEnrolmentId, mnetServiceEnrolEnrolment: UpdateMnetServiceEnrolEnrolmentParams) => {
  const { session } = await getUserAuth();
  const { id: mnetServiceEnrolEnrolmentId } = mnetServiceEnrolEnrolmentIdSchema.parse({ id });
  const newMnetServiceEnrolEnrolment = updateMnetServiceEnrolEnrolmentSchema.parse({ ...mnetServiceEnrolEnrolment, userId: session?.user.id! });
  try {
    const [m] =  await db
     .update(mnetServiceEnrolEnrolments)
     .set(newMnetServiceEnrolEnrolment)
     .where(and(eq(mnetServiceEnrolEnrolments.id, mnetServiceEnrolEnrolmentId!), eq(mnetServiceEnrolEnrolments.userId, session?.user.id!)))
     .returning();
    return { mnetServiceEnrolEnrolment: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteMnetServiceEnrolEnrolment = async (id: MnetServiceEnrolEnrolmentId) => {
  const { session } = await getUserAuth();
  const { id: mnetServiceEnrolEnrolmentId } = mnetServiceEnrolEnrolmentIdSchema.parse({ id });
  try {
    const [m] =  await db.delete(mnetServiceEnrolEnrolments).where(and(eq(mnetServiceEnrolEnrolments.id, mnetServiceEnrolEnrolmentId!), eq(mnetServiceEnrolEnrolments.userId, session?.user.id!)))
    .returning();
    return { mnetServiceEnrolEnrolment: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

