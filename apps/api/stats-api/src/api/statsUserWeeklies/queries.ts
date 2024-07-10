import { db } from "@soco/stats-db/client";
import { eq, and } from "@soco/stats-db";
import { getUserAuth } from "@/lib/auth/utils";
import { type StatsUserWeeklyId, statsUserWeeklyIdSchema, statsUserWeeklies } from "@soco/stats-db/schema/statsUserWeeklies";

export const getStatsUserWeeklies = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select().from(statsUserWeeklies).where(eq(statsUserWeeklies.userId, session?.user.id!));
  const s = rows
  return { statsUserWeeklies: s };
};

export const getStatsUserWeeklyById = async (id: StatsUserWeeklyId) => {
  const { session } = await getUserAuth();
  const { id: statsUserWeeklyId } = statsUserWeeklyIdSchema.parse({ id });
  const [row] = await db.select().from(statsUserWeeklies).where(and(eq(statsUserWeeklies.id, statsUserWeeklyId), eq(statsUserWeeklies.userId, session?.user.id!)));
  if (row === undefined) return {};
  const s = row;
  return { statsUserWeekly: s };
};


