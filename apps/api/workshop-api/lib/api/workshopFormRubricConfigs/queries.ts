import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type WorkshopFormRubricConfigId, workshopFormRubricConfigIdSchema, workshopFormRubricConfigs } from "@/lib/db/schema/workshopFormRubricConfigs";
import { workshops } from "@/lib/db/schema/workshops";

export const getWorkshopFormRubricConfigs = async () => {
  const rows = await db.select({ workshopFormRubricConfig: workshopFormRubricConfigs, workshop: workshops }).from(workshopFormRubricConfigs).leftJoin(workshops, eq(workshopFormRubricConfigs.workshopId, workshops.id));
  const w = rows .map((r) => ({ ...r.workshopFormRubricConfig, workshop: r.workshop})); 
  return { workshopFormRubricConfigs: w };
};

export const getWorkshopFormRubricConfigById = async (id: WorkshopFormRubricConfigId) => {
  const { id: workshopFormRubricConfigId } = workshopFormRubricConfigIdSchema.parse({ id });
  const [row] = await db.select({ workshopFormRubricConfig: workshopFormRubricConfigs, workshop: workshops }).from(workshopFormRubricConfigs).where(eq(workshopFormRubricConfigs.id, workshopFormRubricConfigId)).leftJoin(workshops, eq(workshopFormRubricConfigs.workshopId, workshops.id));
  if (row === undefined) return {};
  const w =  { ...row.workshopFormRubricConfig, workshop: row.workshop } ;
  return { workshopFormRubricConfig: w };
};


