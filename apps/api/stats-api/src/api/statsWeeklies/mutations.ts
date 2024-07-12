import { db } from "@soco/stats-db/client";
import { eq } from "@soco/stats-db";
import { 
  type StatsWeeklyId, 
  type NewStatsWeeklyParams,
  type UpdateStatsWeeklyParams, 
  updateStatsWeeklySchema,
  insertStatsWeeklySchema, 
  statsWeeklies,
  statsWeeklyIdSchema 
} from "@soco/stats-db/schema/statsWeeklies";

export const createStatsWeekly = async (statsWeekly: NewStatsWeeklyParams) => {
  const newStatsWeekly = insertStatsWeeklySchema.parse(statsWeekly);
  try {
    const [s] =  await db.insert(statsWeeklies).values(newStatsWeekly).returning();
    return { statsWeekly: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateStatsWeekly = async (id: StatsWeeklyId, statsWeekly: UpdateStatsWeeklyParams) => {
  const { id: statsWeeklyId } = statsWeeklyIdSchema.parse({ id });
  const newStatsWeekly = updateStatsWeeklySchema.parse(statsWeekly);
  try {
    const [s] =  await db
     .update(statsWeeklies)
     .set(newStatsWeekly)
     .where(eq(statsWeeklies.id, statsWeeklyId!))
     .returning();
    return { statsWeekly: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteStatsWeekly = async (id: StatsWeeklyId) => {
  const { id: statsWeeklyId } = statsWeeklyIdSchema.parse({ id });
  try {
    const [s] =  await db.delete(statsWeeklies).where(eq(statsWeeklies.id, statsWeeklyId!))
    .returning();
    return { statsWeekly: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

