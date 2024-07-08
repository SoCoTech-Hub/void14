import { db } from "@soco/stats-db/index";
import { and, eq } from "drizzle-orm";
import { 
  StatsUserMonthlyId, 
  NewStatsUserMonthlyParams,
  UpdateStatsUserMonthlyParams, 
  updateStatsUserMonthlySchema,
  insertStatsUserMonthlySchema, 
  statsUserMonthlies,
  statsUserMonthlyIdSchema 
} from "@soco/stats-db/schema/statsUserMonthlies";
import { getUserAuth } from "@/lib/auth/utils";

export const createStatsUserMonthly = async (statsUserMonthly: NewStatsUserMonthlyParams) => {
  const { session } = await getUserAuth();
  const newStatsUserMonthly = insertStatsUserMonthlySchema.parse({ ...statsUserMonthly, userId: session?.user.id! });
  try {
    const [s] =  await db.insert(statsUserMonthlies).values(newStatsUserMonthly).returning();
    return { statsUserMonthly: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateStatsUserMonthly = async (id: StatsUserMonthlyId, statsUserMonthly: UpdateStatsUserMonthlyParams) => {
  const { session } = await getUserAuth();
  const { id: statsUserMonthlyId } = statsUserMonthlyIdSchema.parse({ id });
  const newStatsUserMonthly = updateStatsUserMonthlySchema.parse({ ...statsUserMonthly, userId: session?.user.id! });
  try {
    const [s] =  await db
     .update(statsUserMonthlies)
     .set(newStatsUserMonthly)
     .where(and(eq(statsUserMonthlies.id, statsUserMonthlyId!), eq(statsUserMonthlies.userId, session?.user.id!)))
     .returning();
    return { statsUserMonthly: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteStatsUserMonthly = async (id: StatsUserMonthlyId) => {
  const { session } = await getUserAuth();
  const { id: statsUserMonthlyId } = statsUserMonthlyIdSchema.parse({ id });
  try {
    const [s] =  await db.delete(statsUserMonthlies).where(and(eq(statsUserMonthlies.id, statsUserMonthlyId!), eq(statsUserMonthlies.userId, session?.user.id!)))
    .returning();
    return { statsUserMonthly: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

