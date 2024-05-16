import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type WorkshopFormRubricLevelId, workshopFormRubricLevelIdSchema, workshopFormRubricLevels } from "@/lib/db/schema/workshopFormRubricLevels";

export const getWorkshopFormRubricLevels = async () => {
  const rows = await db.select().from(workshopFormRubricLevels);
  const w = rows
  return { workshopFormRubricLevels: w };
};

export const getWorkshopFormRubricLevelById = async (id: WorkshopFormRubricLevelId) => {
  const { id: workshopFormRubricLevelId } = workshopFormRubricLevelIdSchema.parse({ id });
  const [row] = await db.select().from(workshopFormRubricLevels).where(eq(workshopFormRubricLevels.id, workshopFormRubricLevelId));
  if (row === undefined) return {};
  const w = row;
  return { workshopFormRubricLevel: w };
};


