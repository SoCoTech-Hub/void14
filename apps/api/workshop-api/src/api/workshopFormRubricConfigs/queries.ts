import type { WorkshopFormRubricConfigId } from "@soco/workshop-db/schema/workshopFormRubricConfigs";
import { eq } from "@soco/workshop-db";
import { db } from "@soco/workshop-db/client";
import {
  workshopFormRubricConfigIdSchema,
  workshopFormRubricConfigs,
} from "@soco/workshop-db/schema/workshopFormRubricConfigs";
import { workshops } from "@soco/workshop-db/schema/workshops";

export const getWorkshopFormRubricConfigs = async () => {
  const rows = await db
    .select({
      workshopFormRubricConfig: workshopFormRubricConfigs,
      workshop: workshops,
    })
    .from(workshopFormRubricConfigs)
    .leftJoin(
      workshops,
      eq(workshopFormRubricConfigs.workshopId, workshops.id),
    );
  const w = rows.map((r) => ({
    ...r.workshopFormRubricConfig,
    workshop: r.workshop,
  }));
  return { workshopFormRubricConfigs: w };
};

export const getWorkshopFormRubricConfigById = async (
  id: WorkshopFormRubricConfigId,
) => {
  const { id: workshopFormRubricConfigId } =
    workshopFormRubricConfigIdSchema.parse({ id });
  const [row] = await db
    .select({
      workshopFormRubricConfig: workshopFormRubricConfigs,
      workshop: workshops,
    })
    .from(workshopFormRubricConfigs)
    .where(eq(workshopFormRubricConfigs.id, workshopFormRubricConfigId))
    .leftJoin(
      workshops,
      eq(workshopFormRubricConfigs.workshopId, workshops.id),
    );
  if (row === undefined) return {};
  const w = { ...row.workshopFormRubricConfig, workshop: row.workshop };
  return { workshopFormRubricConfig: w };
};
