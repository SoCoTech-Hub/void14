import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  WorkshopEvalBestSettingId, 
  NewWorkshopEvalBestSettingParams,
  UpdateWorkshopEvalBestSettingParams, 
  updateWorkshopEvalBestSettingSchema,
  insertWorkshopEvalBestSettingSchema, 
  workshopEvalBestSettings,
  workshopEvalBestSettingIdSchema 
} from "@/lib/db/schema/workshopEvalBestSettings";

export const createWorkshopEvalBestSetting = async (workshopEvalBestSetting: NewWorkshopEvalBestSettingParams) => {
  const newWorkshopEvalBestSetting = insertWorkshopEvalBestSettingSchema.parse(workshopEvalBestSetting);
  try {
    const [w] =  await db.insert(workshopEvalBestSettings).values(newWorkshopEvalBestSetting).returning();
    return { workshopEvalBestSetting: w };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateWorkshopEvalBestSetting = async (id: WorkshopEvalBestSettingId, workshopEvalBestSetting: UpdateWorkshopEvalBestSettingParams) => {
  const { id: workshopEvalBestSettingId } = workshopEvalBestSettingIdSchema.parse({ id });
  const newWorkshopEvalBestSetting = updateWorkshopEvalBestSettingSchema.parse(workshopEvalBestSetting);
  try {
    const [w] =  await db
     .update(workshopEvalBestSettings)
     .set(newWorkshopEvalBestSetting)
     .where(eq(workshopEvalBestSettings.id, workshopEvalBestSettingId!))
     .returning();
    return { workshopEvalBestSetting: w };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteWorkshopEvalBestSetting = async (id: WorkshopEvalBestSettingId) => {
  const { id: workshopEvalBestSettingId } = workshopEvalBestSettingIdSchema.parse({ id });
  try {
    const [w] =  await db.delete(workshopEvalBestSettings).where(eq(workshopEvalBestSettings.id, workshopEvalBestSettingId!))
    .returning();
    return { workshopEvalBestSetting: w };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

