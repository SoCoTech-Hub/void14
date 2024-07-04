import { eq } from "drizzle-orm";

import type { StatsWeeklyId } from "../db/schema/statsWeeklies";
import { db } from "../db/index";
import { statsWeeklies, statsWeeklyIdSchema } from "../db/schema/statsWeeklies";

export const getStatsWeeklies = async () => {
  const rows = await db.select().from(statsWeeklies);
  const s = rows;
  return { statsWeeklies: s };
};

export const getStatsWeeklyById = async (id: StatsWeeklyId) => {
  const { id: statsWeeklyId } = statsWeeklyIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(statsWeeklies)
    .where(eq(statsWeeklies.id, statsWeeklyId));
  if (row === undefined) return {};
  const s = row;
  return { statsWeekly: s };
};
