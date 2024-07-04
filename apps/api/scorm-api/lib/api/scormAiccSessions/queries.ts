import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import type { ScormAiccSessionId } from "../db/schema/scormAiccSessions";
import { db } from "../db/index";
import {
  scormAiccSessionIdSchema,
  scormAiccSessions,
} from "../db/schema/scormAiccSessions";
import { scorms } from "../db/schema/scorms";
import { scormScoes } from "../db/schema/scormScoes";

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
