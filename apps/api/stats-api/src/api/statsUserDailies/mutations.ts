import { db } from "@soco/stats-db/client";
import { and, eq } from "@soco/stats-db";
import { 
  StatsUserDailyId, 
  NewStatsUserDailyParams,
  UpdateStatsUserDailyParams, 
  updateStatsUserDailySchema,
  insertStatsUserDailySchema, 
  statsUserDailies,
  statsUserDailyIdSchema 
} from "@soco/stats-db/schema/statsUserDailies";
import { getUserAuth } from "@/lib/auth/utils";

export const createStatsUserDaily = async (statsUserDaily: NewStatsUserDailyParams) => {
  const { session } = await getUserAuth();
  const newStatsUserDaily = insertStatsUserDailySchema.parse({ ...statsUserDaily, userId: session?.user.id! });
  try {
    const [s] =  await db.insert(statsUserDailies).values(newStatsUserDaily).returning();
    return { statsUserDaily: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateStatsUserDaily = async (id: StatsUserDailyId, statsUserDaily: UpdateStatsUserDailyParams) => {
  const { session } = await getUserAuth();
  const { id: statsUserDailyId } = statsUserDailyIdSchema.parse({ id });
  const newStatsUserDaily = updateStatsUserDailySchema.parse({ ...statsUserDaily, userId: session?.user.id! });
  try {
    const [s] =  await db
     .update(statsUserDailies)
     .set(newStatsUserDaily)
     .where(and(eq(statsUserDailies.id, statsUserDailyId!), eq(statsUserDailies.userId, session?.user.id!)))
     .returning();
    return { statsUserDaily: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteStatsUserDaily = async (id: StatsUserDailyId) => {
  const { session } = await getUserAuth();
  const { id: statsUserDailyId } = statsUserDailyIdSchema.parse({ id });
  try {
    const [s] =  await db.delete(statsUserDailies).where(and(eq(statsUserDailies.id, statsUserDailyId!), eq(statsUserDailies.userId, session?.user.id!)))
    .returning();
    return { statsUserDaily: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

