import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { type SessionId, sessionIdSchema, sessions } from "@/lib/db/schema/sessions";

export const getSessions = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select().from(sessions).where(eq(sessions.userId, session?.user.id!));
  const s = rows
  return { sessions: s };
};

export const getSessionById = async (id: SessionId) => {
  const { session } = await getUserAuth();
  const { id: sessionId } = sessionIdSchema.parse({ id });
  const [row] = await db.select().from(sessions).where(and(eq(sessions.id, sessionId), eq(sessions.userId, session?.user.id!)));
  if (row === undefined) return {};
  const s = row;
  return { session: s };
};


