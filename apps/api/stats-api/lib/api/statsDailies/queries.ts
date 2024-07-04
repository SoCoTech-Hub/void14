import { eq } from "drizzle-orm";

import type { StatsDailyId } from "../db/schema/statsDailies";
import { db } from "../db/index";
import { statsDailies, statsDailyIdSchema } from "../db/schema/statsDailies";

export const getStatsDailies = async () => {
  const rows = await db.select().from(statsDailies);
  const s = rows;
  return { statsDailies: s };
};

export const getStatsDailyById = async (id: StatsDailyId) => {
  const { id: statsDailyId } = statsDailyIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(statsDailies)
    .where(eq(statsDailies.id, statsDailyId));
  if (row === undefined) return {};
  const s = row;
  return { statsDaily: s };
};
