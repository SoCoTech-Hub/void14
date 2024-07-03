import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { type BigBlueButtonBnLogId, bigBlueButtonBnLogIdSchema, bigBlueButtonBnLogs } from "@/lib/db/schema/bigBlueButtonBnLogs";
import { bigBlueButtonBns } from "@/lib/db/schema/bigBlueButtonBns";

export const getBigBlueButtonBnLogs = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select({ bigBlueButtonBnLog: bigBlueButtonBnLogs, bigBlueButtonBn: bigBlueButtonBns }).from(bigBlueButtonBnLogs).leftJoin(bigBlueButtonBns, eq(bigBlueButtonBnLogs.bigBlueButtonBnId, bigBlueButtonBns.id)).where(eq(bigBlueButtonBnLogs.userId, session?.user.id!));
  const b = rows .map((r) => ({ ...r.bigBlueButtonBnLog, bigBlueButtonBn: r.bigBlueButtonBn})); 
  return { bigBlueButtonBnLogs: b };
};

export const getBigBlueButtonBnLogById = async (id: BigBlueButtonBnLogId) => {
  const { session } = await getUserAuth();
  const { id: bigBlueButtonBnLogId } = bigBlueButtonBnLogIdSchema.parse({ id });
  const [row] = await db.select({ bigBlueButtonBnLog: bigBlueButtonBnLogs, bigBlueButtonBn: bigBlueButtonBns }).from(bigBlueButtonBnLogs).where(and(eq(bigBlueButtonBnLogs.id, bigBlueButtonBnLogId), eq(bigBlueButtonBnLogs.userId, session?.user.id!))).leftJoin(bigBlueButtonBns, eq(bigBlueButtonBnLogs.bigBlueButtonBnId, bigBlueButtonBns.id));
  if (row === undefined) return {};
  const b =  { ...row.bigBlueButtonBnLog, bigBlueButtonBn: row.bigBlueButtonBn } ;
  return { bigBlueButtonBnLog: b };
};


