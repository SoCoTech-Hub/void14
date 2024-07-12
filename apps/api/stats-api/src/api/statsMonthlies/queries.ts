import type { StatsMonthlyId } from "@soco/stats-db/schema/statsMonthlies";
import { eq } from "@soco/stats-db";
import { db } from "@soco/stats-db/client";
import {
  statsMonthlies,
  statsMonthlyIdSchema,
} from "@soco/stats-db/schema/statsMonthlies";

export const getStatsMonthlies = async () => {
  const rows = await db.select().from(statsMonthlies);
  const s = rows;
  return { statsMonthlies: s };
};

export const getStatsMonthlyById = async (id: StatsMonthlyId) => {
  const { id: statsMonthlyId } = statsMonthlyIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(statsMonthlies)
    .where(eq(statsMonthlies.id, statsMonthlyId));
  if (row === undefined) return {};
  const s = row;
  return { statsMonthly: s };
};
