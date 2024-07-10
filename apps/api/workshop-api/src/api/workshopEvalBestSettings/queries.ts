import { db } from "@soco/workshop-db/client";
import { eq } from "@soco/workshop-db";
import { type WorkshopEvalBestSettingId, workshopEvalBestSettingIdSchema, workshopEvalBestSettings } from "@soco/workshop-db/schema/workshopEvalBestSettings";
import { workshops } from "@soco/workshop-db/schema/workshops";

export const getWorkshopEvalBestSettings = async () => {
  const rows = await db.select({ workshopEvalBestSetting: workshopEvalBestSettings, workshop: workshops }).from(workshopEvalBestSettings).leftJoin(workshops, eq(workshopEvalBestSettings.workshopId, workshops.id));
  const w = rows .map((r) => ({ ...r.workshopEvalBestSetting, workshop: r.workshop})); 
  return { workshopEvalBestSettings: w };
};

export const getWorkshopEvalBestSettingById = async (id: WorkshopEvalBestSettingId) => {
  const { id: workshopEvalBestSettingId } = workshopEvalBestSettingIdSchema.parse({ id });
  const [row] = await db.select({ workshopEvalBestSetting: workshopEvalBestSettings, workshop: workshops }).from(workshopEvalBestSettings).where(eq(workshopEvalBestSettings.id, workshopEvalBestSettingId)).leftJoin(workshops, eq(workshopEvalBestSettings.workshopId, workshops.id));
  if (row === undefined) return {};
  const w =  { ...row.workshopEvalBestSetting, workshop: row.workshop } ;
  return { workshopEvalBestSetting: w };
};


