import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  GradeSettingId, 
  NewGradeSettingParams,
  UpdateGradeSettingParams, 
  updateGradeSettingSchema,
  insertGradeSettingSchema, 
  gradeSettings,
  gradeSettingIdSchema 
} from "@/lib/db/schema/gradeSettings";

export const createGradeSetting = async (gradeSetting: NewGradeSettingParams) => {
  const newGradeSetting = insertGradeSettingSchema.parse(gradeSetting);
  try {
    const [g] =  await db.insert(gradeSettings).values(newGradeSetting).returning();
    return { gradeSetting: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateGradeSetting = async (id: GradeSettingId, gradeSetting: UpdateGradeSettingParams) => {
  const { id: gradeSettingId } = gradeSettingIdSchema.parse({ id });
  const newGradeSetting = updateGradeSettingSchema.parse(gradeSetting);
  try {
    const [g] =  await db
     .update(gradeSettings)
     .set(newGradeSetting)
     .where(eq(gradeSettings.id, gradeSettingId!))
     .returning();
    return { gradeSetting: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteGradeSetting = async (id: GradeSettingId) => {
  const { id: gradeSettingId } = gradeSettingIdSchema.parse({ id });
  try {
    const [g] =  await db.delete(gradeSettings).where(eq(gradeSettings.id, gradeSettingId!))
    .returning();
    return { gradeSetting: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

