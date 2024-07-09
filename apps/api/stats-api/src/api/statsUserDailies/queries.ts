import { and, eq } from "drizzle-orm";

import type { StatsUserDailyId } from "@soco/stats-db/schema/statsUserDailies";
import { getUserAuth } from "@soco/auth-services";
import { db } from "@soco/stats-db/index";
import {
  statsUserDailies,
  statsUserDailyIdSchema,
} from "@soco/stats-db/schema/statsUserDailies";

export const getStatsUserDailies = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(statsUserDailies)
    .where(eq(statsUserDailies.userId, session?.user.id!));
  const s = rows;
  return { statsUserDailies: s };
};

export const getStatsUserDailyById = async (id: StatsUserDailyId) => {
  const { session } = await getUserAuth();
  const { id: statsUserDailyId } = statsUserDailyIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(statsUserDailies)
    .where(
      and(
        eq(statsUserDailies.id, statsUserDailyId),
        eq(statsUserDailies.userId, session?.user.id!),
      ),
    );
  if (row === undefined) return {};
  const s = row;
  return { statsUserDaily: s };
};
