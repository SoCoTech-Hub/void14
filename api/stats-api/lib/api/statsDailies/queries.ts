import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type StatsDailyId, statsDailyIdSchema, statsDailies } from "@/lib/db/schema/statsDailies";

export const getStatsDailies = async () => {
  const rows = await db.select().from(statsDailies);
  const s = rows
  return { statsDailies: s };
};

export const getStatsDailyById = async (id: StatsDailyId) => {
  const { id: statsDailyId } = statsDailyIdSchema.parse({ id });
  const [row] = await db.select().from(statsDailies).where(eq(statsDailies.id, statsDailyId));
  if (row === undefined) return {};
  const s = row;
  return { statsDaily: s };
};


