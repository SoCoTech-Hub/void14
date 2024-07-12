import { db } from "@/lib/db/index";
import { and, eq } from "drizzle-orm";
import { 
  type MnetSessionId, 
  type NewMnetSessionParams,
  type UpdateMnetSessionParams, 
  updateMnetSessionSchema,
  insertMnetSessionSchema, 
  mnetSessions,
  mnetSessionIdSchema 
} from "@/lib/db/schema/mnetSessions";
import { getUserAuth } from "@/lib/auth/utils";

export const createMnetSession = async (mnetSession: NewMnetSessionParams) => {
  const { session } = await getUserAuth();
  const newMnetSession = insertMnetSessionSchema.parse({ ...mnetSession, userId: session?.user.id! });
  try {
    const [m] =  await db.insert(mnetSessions).values(newMnetSession).returning();
    return { mnetSession: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateMnetSession = async (id: MnetSessionId, mnetSession: UpdateMnetSessionParams) => {
  const { session } = await getUserAuth();
  const { id: mnetSessionId } = mnetSessionIdSchema.parse({ id });
  const newMnetSession = updateMnetSessionSchema.parse({ ...mnetSession, userId: session?.user.id! });
  try {
    const [m] =  await db
     .update(mnetSessions)
     .set(newMnetSession)
     .where(and(eq(mnetSessions.id, mnetSessionId!), eq(mnetSessions.userId, session?.user.id!)))
     .returning();
    return { mnetSession: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteMnetSession = async (id: MnetSessionId) => {
  const { session } = await getUserAuth();
  const { id: mnetSessionId } = mnetSessionIdSchema.parse({ id });
  try {
    const [m] =  await db.delete(mnetSessions).where(and(eq(mnetSessions.id, mnetSessionId!), eq(mnetSessions.userId, session?.user.id!)))
    .returning();
    return { mnetSession: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

