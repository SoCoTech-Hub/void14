import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  StatsDailyId, 
  NewStatsDailyParams,
  UpdateStatsDailyParams, 
  updateStatsDailySchema,
  insertStatsDailySchema, 
  statsDailies,
  statsDailyIdSchema 
} from "@/lib/db/schema/statsDailies";

export const createStatsDaily = async (statsDaily: NewStatsDailyParams) => {
  const newStatsDaily = insertStatsDailySchema.parse(statsDaily);
  try {
    const [s] =  await db.insert(statsDailies).values(newStatsDaily).returning();
    return { statsDaily: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateStatsDaily = async (id: StatsDailyId, statsDaily: UpdateStatsDailyParams) => {
  const { id: statsDailyId } = statsDailyIdSchema.parse({ id });
  const newStatsDaily = updateStatsDailySchema.parse(statsDaily);
  try {
    const [s] =  await db
     .update(statsDailies)
     .set(newStatsDaily)
     .where(eq(statsDailies.id, statsDailyId!))
     .returning();
    return { statsDaily: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteStatsDaily = async (id: StatsDailyId) => {
  const { id: statsDailyId } = statsDailyIdSchema.parse({ id });
  try {
    const [s] =  await db.delete(statsDailies).where(eq(statsDailies.id, statsDailyId!))
    .returning();
    return { statsDaily: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

