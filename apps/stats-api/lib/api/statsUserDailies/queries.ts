import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { type StatsUserDailyId, statsUserDailyIdSchema, statsUserDailies } from "@/lib/db/schema/statsUserDailies";

export const getStatsUserDailies = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select().from(statsUserDailies).where(eq(statsUserDailies.userId, session?.user.id!));
  const s = rows
  return { statsUserDailies: s };
};

export const getStatsUserDailyById = async (id: StatsUserDailyId) => {
  const { session } = await getUserAuth();
  const { id: statsUserDailyId } = statsUserDailyIdSchema.parse({ id });
  const [row] = await db.select().from(statsUserDailies).where(and(eq(statsUserDailies.id, statsUserDailyId), eq(statsUserDailies.userId, session?.user.id!)));
  if (row === undefined) return {};
  const s = row;
  return { statsUserDaily: s };
};


