import { eq } from "drizzle-orm";

import type { WorkshopAllocationScheduleId } from "../db/schema/workshopAllocationSchedules";
import { db } from "../db/index";
import {
  workshopAllocationScheduleIdSchema,
  workshopAllocationSchedules,
} from "../db/schema/workshopAllocationSchedules";
import { workshops } from "../db/schema/workshops";

export const getWorkshopAllocationSchedules = async () => {
  const rows = await db
    .select({
      workshopAllocationSchedule: workshopAllocationSchedules,
      workshop: workshops,
    })
    .from(workshopAllocationSchedules)
    .leftJoin(
      workshops,
      eq(workshopAllocationSchedules.workshopId, workshops.id),
    );
  const w = rows.map((r) => ({
    ...r.workshopAllocationSchedule,
    workshop: r.workshop,
  }));
  return { workshopAllocationSchedules: w };
};

export const getWorkshopAllocationScheduleById = async (
  id: WorkshopAllocationScheduleId,
) => {
  const { id: workshopAllocationScheduleId } =
    workshopAllocationScheduleIdSchema.parse({ id });
  const [row] = await db
    .select({
      workshopAllocationSchedule: workshopAllocationSchedules,
      workshop: workshops,
    })
    .from(workshopAllocationSchedules)
    .where(eq(workshopAllocationSchedules.id, workshopAllocationScheduleId))
    .leftJoin(
      workshops,
      eq(workshopAllocationSchedules.workshopId, workshops.id),
    );
  if (row === undefined) return {};
  const w = { ...row.workshopAllocationSchedule, workshop: row.workshop };
  return { workshopAllocationSchedule: w };
};
