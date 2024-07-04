import { eq } from "drizzle-orm";

import type { WorkshopFormAccumulativeId } from "../db/schema/workshopFormAccumulatives";
import { db } from "../db/index";
import {
  workshopFormAccumulativeIdSchema,
  workshopFormAccumulatives,
} from "../db/schema/workshopFormAccumulatives";
import { workshops } from "../db/schema/workshops";

export const getWorkshopFormAccumulatives = async () => {
  const rows = await db
    .select({
      workshopFormAccumulative: workshopFormAccumulatives,
      workshop: workshops,
    })
    .from(workshopFormAccumulatives)
    .leftJoin(
      workshops,
      eq(workshopFormAccumulatives.workshopId, workshops.id),
    );
  const w = rows.map((r) => ({
    ...r.workshopFormAccumulative,
    workshop: r.workshop,
  }));
  return { workshopFormAccumulatives: w };
};

export const getWorkshopFormAccumulativeById = async (
  id: WorkshopFormAccumulativeId,
) => {
  const { id: workshopFormAccumulativeId } =
    workshopFormAccumulativeIdSchema.parse({ id });
  const [row] = await db
    .select({
      workshopFormAccumulative: workshopFormAccumulatives,
      workshop: workshops,
    })
    .from(workshopFormAccumulatives)
    .where(eq(workshopFormAccumulatives.id, workshopFormAccumulativeId))
    .leftJoin(
      workshops,
      eq(workshopFormAccumulatives.workshopId, workshops.id),
    );
  if (row === undefined) return {};
  const w = { ...row.workshopFormAccumulative, workshop: row.workshop };
  return { workshopFormAccumulative: w };
};
