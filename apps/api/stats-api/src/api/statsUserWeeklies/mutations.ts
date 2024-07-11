import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/stats-db";
import { db } from "@soco/stats-db/client";
import {
  insertStatsUserWeeklySchema,
  NewStatsUserWeeklyParams,
  statsUserWeeklies,
  StatsUserWeeklyId,
  statsUserWeeklyIdSchema,
  UpdateStatsUserWeeklyParams,
  updateStatsUserWeeklySchema,
} from "@soco/stats-db/schema/statsUserWeeklies";

export const createStatsUserWeekly = async (
  statsUserWeekly: NewStatsUserWeeklyParams,
) => {
  const { session } = await getUserAuth();
  const newStatsUserWeekly = insertStatsUserWeeklySchema.parse({
    ...statsUserWeekly,
    userId: session?.user.id!,
  });
  try {
    const [s] = await db
      .insert(statsUserWeeklies)
      .values(newStatsUserWeekly)
      .returning();
    return { statsUserWeekly: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateStatsUserWeekly = async (
  id: StatsUserWeeklyId,
  statsUserWeekly: UpdateStatsUserWeeklyParams,
) => {
  const { session } = await getUserAuth();
  const { id: statsUserWeeklyId } = statsUserWeeklyIdSchema.parse({ id });
  const newStatsUserWeekly = updateStatsUserWeeklySchema.parse({
    ...statsUserWeekly,
    userId: session?.user.id!,
  });
  try {
    const [s] = await db
      .update(statsUserWeeklies)
      .set(newStatsUserWeekly)
      .where(
        and(
          eq(statsUserWeeklies.id, statsUserWeeklyId!),
          eq(statsUserWeeklies.userId, session?.user.id!),
        ),
      )
      .returning();
    return { statsUserWeekly: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteStatsUserWeekly = async (id: StatsUserWeeklyId) => {
  const { session } = await getUserAuth();
  const { id: statsUserWeeklyId } = statsUserWeeklyIdSchema.parse({ id });
  try {
    const [s] = await db
      .delete(statsUserWeeklies)
      .where(
        and(
          eq(statsUserWeeklies.id, statsUserWeeklyId!),
          eq(statsUserWeeklies.userId, session?.user.id!),
        ),
      )
      .returning();
    return { statsUserWeekly: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
