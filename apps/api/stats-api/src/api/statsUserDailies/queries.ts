import { db } from "@soco/stats-db/client";
import { eq, and } from "@soco/stats-db";
import { getUserAuth } from "@soco/auth-service";
import { type StatsUserDailyId, statsUserDailyIdSchema, statsUserDailies } from "@soco/stats-db/schema/statsUserDailies";

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


