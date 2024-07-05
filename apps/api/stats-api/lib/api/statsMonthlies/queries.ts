import { eq } from "drizzle-orm";

import type { StatsMonthlyId } from "../../db/schema/statsMonthlies";
import { db } from "../../db/index";
import {
  statsMonthlies,
  statsMonthlyIdSchema,
} from "../../db/schema/statsMonthlies";

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
