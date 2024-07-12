import type {
  NewScormAiccSessionParams,
  ScormAiccSessionId,
  UpdateScormAiccSessionParams,
} from "@soco/scorm-db/schema/scormAiccSessions";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/scorm-db";
import { db } from "@soco/scorm-db/client";
import {
  insertScormAiccSessionSchema,
  scormAiccSessionIdSchema,
  scormAiccSessions,
  updateScormAiccSessionSchema,
} from "@soco/scorm-db/schema/scormAiccSessions";

export const createScormAiccSession = async (
  scormAiccSession: NewScormAiccSessionParams,
) => {
  const { session } = await getUserAuth();
  const newScormAiccSession = insertScormAiccSessionSchema.parse({
    ...scormAiccSession,
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    userId: session?.user.id!,
  });
  try {
    const [s] = await db
      .insert(scormAiccSessions)
      .values(newScormAiccSession)
      .returning();
    return { scormAiccSession: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateScormAiccSession = async (
  id: ScormAiccSessionId,
  scormAiccSession: UpdateScormAiccSessionParams,
) => {
  const { session } = await getUserAuth();
  const { id: scormAiccSessionId } = scormAiccSessionIdSchema.parse({ id });
  const newScormAiccSession = updateScormAiccSessionSchema.parse({
    ...scormAiccSession,
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    userId: session?.user.id!,
  });
  try {
    const [s] = await db
      .update(scormAiccSessions)
      .set({ ...newScormAiccSession, updatedAt: new Date() })
      .where(
        and(
          // biome-ignore lint/style/noNonNullAssertion: <explanation>
          eq(scormAiccSessions.id, scormAiccSessionId!),
          // biome-ignore lint/style/noNonNullAssertion: <explanation>
          eq(scormAiccSessions.userId, session?.user.id!),
        ),
      )
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
    const [s] = await db
      .delete(scormAiccSessions)
      .where(
        and(
          // biome-ignore lint/style/noNonNullAssertion: <explanation>
          eq(scormAiccSessions.id, scormAiccSessionId!),
          // biome-ignore lint/style/noNonNullAssertion: <explanation>
          eq(scormAiccSessions.userId, session?.user.id!),
        ),
      )
      .returning();
    return { scormAiccSession: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
