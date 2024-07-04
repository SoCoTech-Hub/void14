import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import type { StatsUserMonthlyId } from "../db/schema/statsUserMonthlies";
import { db } from "../db/index";
import {
  statsUserMonthlies,
  statsUserMonthlyIdSchema,
} from "../db/schema/statsUserMonthlies";

export const getStatsUserMonthlies = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(statsUserMonthlies)
    .where(eq(statsUserMonthlies.userId, session?.user.id!));
  const s = rows;
  return { statsUserMonthlies: s };
};

export const getStatsUserMonthlyById = async (id: StatsUserMonthlyId) => {
  const { session } = await getUserAuth();
  const { id: statsUserMonthlyId } = statsUserMonthlyIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(statsUserMonthlies)
    .where(
      and(
        eq(statsUserMonthlies.id, statsUserMonthlyId),
        eq(statsUserMonthlies.userId, session?.user.id!),
      ),
    );
  if (row === undefined) return {};
  const s = row;
  return { statsUserMonthly: s };
};
