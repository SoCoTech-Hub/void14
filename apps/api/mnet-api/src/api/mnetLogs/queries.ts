import { db } from "@soco/mnet-db/client";
import { eq, and } from "@soco/mnet-db";
import { getUserAuth } from "@/lib/auth/utils";
import { type MnetLogId, mnetLogIdSchema, mnetLogs } from "@soco/mnet-db/schema/mnetLogs";
import { mnetHosts } from "@soco/mnet-db/schema/mnetHosts";

export const getMnetLogs = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select({ mnetLog: mnetLogs, mnetHost: mnetHosts }).from(mnetLogs).leftJoin(mnetHosts, eq(mnetLogs.mnetHostId, mnetHosts.id)).where(eq(mnetLogs.userId, session?.user.id!));
  const m = rows .map((r) => ({ ...r.mnetLog, mnetHost: r.mnetHost})); 
  return { mnetLogs: m };
};

export const getMnetLogById = async (id: MnetLogId) => {
  const { session } = await getUserAuth();
  const { id: mnetLogId } = mnetLogIdSchema.parse({ id });
  const [row] = await db.select({ mnetLog: mnetLogs, mnetHost: mnetHosts }).from(mnetLogs).where(and(eq(mnetLogs.id, mnetLogId), eq(mnetLogs.userId, session?.user.id!))).leftJoin(mnetHosts, eq(mnetLogs.mnetHostId, mnetHosts.id));
  if (row === undefined) return {};
  const m =  { ...row.mnetLog, mnetHost: row.mnetHost } ;
  return { mnetLog: m };
};


