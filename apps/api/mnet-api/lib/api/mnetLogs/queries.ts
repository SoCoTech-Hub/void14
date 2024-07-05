import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import type { MnetLogId } from "../../db/schema/mnetLogs";
import { db } from "../../db/index";
import { mnetHosts } from "../../db/schema/mnetHosts";
import { mnetLogIdSchema, mnetLogs } from "../../db/schema/mnetLogs";

export const getMnetLogs = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select({ mnetLog: mnetLogs, mnetHost: mnetHosts })
    .from(mnetLogs)
    .leftJoin(mnetHosts, eq(mnetLogs.mnetHostId, mnetHosts.id))
    .where(eq(mnetLogs.userId, session?.user.id!));
  const m = rows.map((r) => ({ ...r.mnetLog, mnetHost: r.mnetHost }));
  return { mnetLogs: m };
};

export const getMnetLogById = async (id: MnetLogId) => {
  const { session } = await getUserAuth();
  const { id: mnetLogId } = mnetLogIdSchema.parse({ id });
  const [row] = await db
    .select({ mnetLog: mnetLogs, mnetHost: mnetHosts })
    .from(mnetLogs)
    .where(
      and(eq(mnetLogs.id, mnetLogId), eq(mnetLogs.userId, session?.user.id!)),
    )
    .leftJoin(mnetHosts, eq(mnetLogs.mnetHostId, mnetHosts.id));
  if (row === undefined) return {};
  const m = { ...row.mnetLog, mnetHost: row.mnetHost };
  return { mnetLog: m };
};
