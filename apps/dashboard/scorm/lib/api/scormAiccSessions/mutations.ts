import { db } from "@/lib/db/index";
import { and, eq } from "drizzle-orm";
import { 
  type ScormAiccSessionId, 
  type NewScormAiccSessionParams,
  type UpdateScormAiccSessionParams, 
  updateScormAiccSessionSchema,
  insertScormAiccSessionSchema, 
  scormAiccSessions,
  scormAiccSessionIdSchema 
} from "@/lib/db/schema/scormAiccSessions";
import { getUserAuth } from "@/lib/auth/utils";

export const createScormAiccSession = async (scormAiccSession: NewScormAiccSessionParams) => {
  const { session } = await getUserAuth();
  const newScormAiccSession = insertScormAiccSessionSchema.parse({ ...scormAiccSession, userId: session?.user.id! });
  try {
    const [s] =  await db.insert(scormAiccSessions).values(newScormAiccSession).returning();
    return { scormAiccSession: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateScormAiccSession = async (id: ScormAiccSessionId, scormAiccSession: UpdateScormAiccSessionParams) => {
  const { session } = await getUserAuth();
  const { id: scormAiccSessionId } = scormAiccSessionIdSchema.parse({ id });
  const newScormAiccSession = updateScormAiccSessionSchema.parse({ ...scormAiccSession, userId: session?.user.id! });
  try {
    const [s] =  await db
     .update(scormAiccSessions)
     .set({...newScormAiccSession, updatedAt: new Date() })
     .where(and(eq(scormAiccSessions.id, scormAiccSessionId!), eq(scormAiccSessions.userId, session?.user.id!)))
     .returning();
    return { scormAiccSession: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteScormAiccSession = async (id: ScormAiccSessionId) => {
  const { session } = await getUserAuth();
  const { id: scormAiccSessionId } = scormAiccSessionIdSchema.parse({ id });
  try {
    const [s] =  await db.delete(scormAiccSessions).where(and(eq(scormAiccSessions.id, scormAiccSessionId!), eq(scormAiccSessions.userId, session?.user.id!)))
    .returning();
    return { scormAiccSession: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

