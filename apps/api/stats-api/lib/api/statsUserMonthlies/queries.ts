import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@soco/auth/utils";
import { type StatsUserMonthlyId, statsUserMonthlyIdSchema, statsUserMonthlies } from "@/lib/db/schema/statsUserMonthlies";

export const getStatsUserMonthlies = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select().from(statsUserMonthlies).where(eq(statsUserMonthlies.userId, session?.user.id!));
  const s = rows
  return { statsUserMonthlies: s };
};

export const getStatsUserMonthlyById = async (id: StatsUserMonthlyId) => {
  const { session } = await getUserAuth();
  const { id: statsUserMonthlyId } = statsUserMonthlyIdSchema.parse({ id });
  const [row] = await db.select().from(statsUserMonthlies).where(and(eq(statsUserMonthlies.id, statsUserMonthlyId), eq(statsUserMonthlies.userId, session?.user.id!)));
  if (row === undefined) return {};
  const s = row;
  return { statsUserMonthly: s };
};


