import { db } from "@soco/stats-db/client";
import { eq } from "@soco/stats-db";
import { type StatsWeeklyId, statsWeeklyIdSchema, statsWeeklies } from "@soco/stats-db/schema/statsWeeklies";

export const getStatsWeeklies = async () => {
  const rows = await db.select().from(statsWeeklies);
  const s = rows
  return { statsWeeklies: s };
};

export const getStatsWeeklyById = async (id: StatsWeeklyId) => {
  const { id: statsWeeklyId } = statsWeeklyIdSchema.parse({ id });
  const [row] = await db.select().from(statsWeeklies).where(eq(statsWeeklies.id, statsWeeklyId));
  if (row === undefined) return {};
  const s = row;
  return { statsWeekly: s };
};


