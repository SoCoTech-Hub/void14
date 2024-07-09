import { and, eq } from "drizzle-orm";

import type { MnetSessionId } from "@soco/mnet-db/schema/mnetSessions";
import { getUserAuth } from "@soco/auth-services";
import { db } from "@soco/mnet-db/index";
import { mnetHosts } from "@soco/mnet-db/schema/mnetHosts";
import {
  mnetSessionIdSchema,
  mnetSessions,
} from "@soco/mnet-db/schema/mnetSessions";

export const getMnetSessions = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select({ mnetSession: mnetSessions, mnetHost: mnetHosts })
    .from(mnetSessions)
    .leftJoin(mnetHosts, eq(mnetSessions.mnetHostId, mnetHosts.id))
    .where(eq(mnetSessions.userId, session?.user.id!));
  const m = rows.map((r) => ({ ...r.mnetSession, mnetHost: r.mnetHost }));
  return { mnetSessions: m };
};

export const getMnetSessionById = async (id: MnetSessionId) => {
  const { session } = await getUserAuth();
  const { id: mnetSessionId } = mnetSessionIdSchema.parse({ id });
  const [row] = await db
    .select({ mnetSession: mnetSessions, mnetHost: mnetHosts })
    .from(mnetSessions)
    .where(
      and(
        eq(mnetSessions.id, mnetSessionId),
        eq(mnetSessions.userId, session?.user.id!),
      ),
    )
    .leftJoin(mnetHosts, eq(mnetSessions.mnetHostId, mnetHosts.id));
  if (row === undefined) return {};
  const m = { ...row.mnetSession, mnetHost: row.mnetHost };
  return { mnetSession: m };
};
