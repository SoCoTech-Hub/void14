import { eq } from "drizzle-orm";

import { db } from "../../db/index";
import {
  insertStatsMonthlySchema,
  NewStatsMonthlyParams,
  statsMonthlies,
  StatsMonthlyId,
  statsMonthlyIdSchema,
  UpdateStatsMonthlyParams,
  updateStatsMonthlySchema,
} from "../../db/schema/statsMonthlies";

export const createStatsMonthly = async (
  statsMonthly: NewStatsMonthlyParams,
) => {
  const newStatsMonthly = insertStatsMonthlySchema.parse(statsMonthly);
  try {
    const [s] = await db
      .insert(statsMonthlies)
      .values(newStatsMonthly)
      .returning();
    return { statsMonthly: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateStatsMonthly = async (
  id: StatsMonthlyId,
  statsMonthly: UpdateStatsMonthlyParams,
) => {
  const { id: statsMonthlyId } = statsMonthlyIdSchema.parse({ id });
  const newStatsMonthly = updateStatsMonthlySchema.parse(statsMonthly);
  try {
    const [s] = await db
      .update(statsMonthlies)
      .set(newStatsMonthly)
      .where(eq(statsMonthlies.id, statsMonthlyId!))
      .returning();
    return { statsMonthly: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteStatsMonthly = async (id: StatsMonthlyId) => {
  const { id: statsMonthlyId } = statsMonthlyIdSchema.parse({ id });
  try {
    const [s] = await db
      .delete(statsMonthlies)
      .where(eq(statsMonthlies.id, statsMonthlyId!))
      .returning();
    return { statsMonthly: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
