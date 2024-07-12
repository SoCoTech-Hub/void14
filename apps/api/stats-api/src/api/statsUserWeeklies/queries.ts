import type { StatsUserWeeklyId } from "@soco/stats-db/schema/statsUserWeeklies";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/stats-db";
import { db } from "@soco/stats-db/client";
import {
  statsUserWeeklies,
  statsUserWeeklyIdSchema,
} from "@soco/stats-db/schema/statsUserWeeklies";

export const getStatsUserWeeklies = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(statsUserWeeklies)
    .where(eq(statsUserWeeklies.userId, session?.user.id!));
  const s = rows;
  return { statsUserWeeklies: s };
};

export const getStatsUserWeeklyById = async (id: StatsUserWeeklyId) => {
  const { session } = await getUserAuth();
  const { id: statsUserWeeklyId } = statsUserWeeklyIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(statsUserWeeklies)
    .where(
      and(
        eq(statsUserWeeklies.id, statsUserWeeklyId),
        eq(statsUserWeeklies.userId, session?.user.id!),
      ),
    );
  if (row === undefined) return {};
  const s = row;
  return { statsUserWeekly: s };
};
