import type { ScormAiccSessionId } from "@soco/scorm-db/schema/scormAiccSessions";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/scorm-db";
import { db } from "@soco/scorm-db/client";
import {
  scormAiccSessionIdSchema,
  scormAiccSessions,
} from "@soco/scorm-db/schema/scormAiccSessions";
import { scorms } from "@soco/scorm-db/schema/scorms";
import { scormScoes } from "@soco/scorm-db/schema/scormScoes";

export const getScormAiccSessions = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select({
      scormAiccSession: scormAiccSessions,
      scormScoe: scormScoes,
      scorm: scorms,
    })
    .from(scormAiccSessions)
    .leftJoin(scormScoes, eq(scormAiccSessions.scormScoeId, scormScoes.id))
    .leftJoin(scorms, eq(scormAiccSessions.scormId, scorms.id))
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    .where(eq(scormAiccSessions.userId, session?.user.id!));
  const s = rows.map((r) => ({
    ...r.scormAiccSession,
    scormScoe: r.scormScoe,
    scorm: r.scorm,
  }));
  return { scormAiccSessions: s };
};

export const getScormAiccSessionById = async (id: ScormAiccSessionId) => {
  const { session } = await getUserAuth();
  const { id: scormAiccSessionId } = scormAiccSessionIdSchema.parse({ id });
  const [row] = await db
    .select({
      scormAiccSession: scormAiccSessions,
      scormScoe: scormScoes,
      scorm: scorms,
    })
    .from(scormAiccSessions)
    .where(
      and(
        eq(scormAiccSessions.id, scormAiccSessionId),
        // biome-ignore lint/style/noNonNullAssertion: <explanation>
        eq(scormAiccSessions.userId, session?.user.id!),
      ),
    )
    .leftJoin(scormScoes, eq(scormAiccSessions.scormScoeId, scormScoes.id))
    .leftJoin(scorms, eq(scormAiccSessions.scormId, scorms.id));
  if (row === undefined) return {};
  const s = {
    ...row.scormAiccSession,
    scormScoe: row.scormScoe,
    scorm: row.scorm,
  };
  return { scormAiccSession: s };
};
