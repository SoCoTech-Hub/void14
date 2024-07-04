import { eq } from "drizzle-orm";

import type { WorkshopId } from "../db/schema/workshops";
import { db } from "../db/index";
import { workshopIdSchema, workshops } from "../db/schema/workshops";

export const getWorkshops = async () => {
  const rows = await db.select().from(workshops);
  const w = rows;
  return { workshops: w };
};

export const getWorkshopById = async (id: WorkshopId) => {
  const { id: workshopId } = workshopIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(workshops)
    .where(eq(workshops.id, workshopId));
  if (row === undefined) return {};
  const w = row;
  return { workshop: w };
};
