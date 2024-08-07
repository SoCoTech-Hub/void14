import { db } from "@/lib/db/index";
import { and, eq } from "drizzle-orm";
import { 
  type SessionId, 
  type NewSessionParams,
  type UpdateSessionParams, 
  updateSessionSchema,
  insertSessionSchema, 
  sessions,
  sessionIdSchema 
} from "@/lib/db/schema/sessions";
import { getUserAuth } from "@/lib/auth/utils";

export const createSession = async (session: NewSessionParams) => {
  const { session } = await getUserAuth();
  const newSession = insertSessionSchema.parse({ ...session, userId: session?.user.id! });
  try {
    const [s] =  await db.insert(sessions).values(newSession).returning();
    return { session: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateSession = async (id: SessionId, session: UpdateSessionParams) => {
  const { session } = await getUserAuth();
  const { id: sessionId } = sessionIdSchema.parse({ id });
  const newSession = updateSessionSchema.parse({ ...session, userId: session?.user.id! });
  try {
    const [s] =  await db
     .update(sessions)
     .set({...newSession, updatedAt: new Date() })
     .where(and(eq(sessions.id, sessionId!), eq(sessions.userId, session?.user.id!)))
     .returning();
    return { session: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteSession = async (id: SessionId) => {
  const { session } = await getUserAuth();
  const { id: sessionId } = sessionIdSchema.parse({ id });
  try {
    const [s] =  await db.delete(sessions).where(and(eq(sessions.id, sessionId!), eq(sessions.userId, session?.user.id!)))
    .returning();
    return { session: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

