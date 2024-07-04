import { eq } from "drizzle-orm";

import type { WorkshopFormNumErrorId } from "../db/schema/workshopFormNumErrors";
import { db } from "../db/index";
import {
  workshopFormNumErrorIdSchema,
  workshopFormNumErrors,
} from "../db/schema/workshopFormNumErrors";
import { workshops } from "../db/schema/workshops";

export const getWorkshopFormNumErrors = async () => {
  const rows = await db
    .select({
      workshopFormNumError: workshopFormNumErrors,
      workshop: workshops,
    })
    .from(workshopFormNumErrors)
    .leftJoin(workshops, eq(workshopFormNumErrors.workshopId, workshops.id));
  const w = rows.map((r) => ({
    ...r.workshopFormNumError,
    workshop: r.workshop,
  }));
  return { workshopFormNumErrors: w };
};

export const getWorkshopFormNumErrorById = async (
  id: WorkshopFormNumErrorId,
) => {
  const { id: workshopFormNumErrorId } = workshopFormNumErrorIdSchema.parse({
    id,
  });
  const [row] = await db
    .select({
      workshopFormNumError: workshopFormNumErrors,
      workshop: workshops,
    })
    .from(workshopFormNumErrors)
    .where(eq(workshopFormNumErrors.id, workshopFormNumErrorId))
    .leftJoin(workshops, eq(workshopFormNumErrors.workshopId, workshops.id));
  if (row === undefined) return {};
  const w = { ...row.workshopFormNumError, workshop: row.workshop };
  return { workshopFormNumError: w };
};
