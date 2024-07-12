import type {
  NewSessionParams,
  SessionId,
  UpdateSessionParams,
} from "@soco/sessions-db/schema/sessions";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/sessions-db";
import { db } from "@soco/sessions-db/client";
import {
  insertSessionSchema,
  sessionIdSchema,
  sessions,
  updateSessionSchema,
} from "@soco/sessions-db/schema/sessions";

export const createSession = async (session: NewSessionParams) => {
  const { session: Session } = await getUserAuth();
  const newSession = insertSessionSchema.parse({
    ...session,
    userId: Session?.user.id!,
  });
  try {
    const [s] = await db.insert(sessions).values(newSession).returning();
    return { session: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateSession = async (
  id: SessionId,
  session: UpdateSessionParams,
) => {
  const { session: Session } = await getUserAuth();
  const { id: sessionId } = sessionIdSchema.parse({ id });
  const newSession = updateSessionSchema.parse({
    ...session,
    userId: Session?.user.id!,
  });
  try {
    const [s] = await db
      .update(sessions)
      .set({ ...newSession, updatedAt: new Date() })
      .where(
        and(
          eq(sessions.id, sessionId!),
          eq(sessions.userId, Session?.user.id!),
        ),
      )
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
    const [s] = await db
      .delete(sessions)
      .where(
        and(
          eq(sessions.id, sessionId!),
          eq(sessions.userId, session?.user.id!),
        ),
      )
      .returning();
    return { session: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
