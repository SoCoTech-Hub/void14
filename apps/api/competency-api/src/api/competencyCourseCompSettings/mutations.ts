import { db } from "@soco/competency-db/client";
import { and, eq } from "@soco/competency-db";
import { 
  type CompetencyCourseCompSettingId, 
  type NewCompetencyCourseCompSettingParams,
  type UpdateCompetencyCourseCompSettingParams, 
  updateCompetencyCourseCompSettingSchema,
  insertCompetencyCourseCompSettingSchema, 
  competencyCourseCompSettings,
  competencyCourseCompSettingIdSchema 
} from "@soco/competency-db/schema/competencyCourseCompSettings";
import { getUserAuth } from "@soco/auth-service";

export const createCompetencyCourseCompSetting = async (competencyCourseCompSetting: NewCompetencyCourseCompSettingParams) => {
  const { session } = await getUserAuth();
  const newCompetencyCourseCompSetting = insertCompetencyCourseCompSettingSchema.parse({ ...competencyCourseCompSetting, userId: session?.user.id! });
  try {
    const [c] =  await db.insert(competencyCourseCompSettings).values(newCompetencyCourseCompSetting).returning();
    return { competencyCourseCompSetting: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateCompetencyCourseCompSetting = async (id: CompetencyCourseCompSettingId, competencyCourseCompSetting: UpdateCompetencyCourseCompSettingParams) => {
  const { session } = await getUserAuth();
  const { id: competencyCourseCompSettingId } = competencyCourseCompSettingIdSchema.parse({ id });
  const newCompetencyCourseCompSetting = updateCompetencyCourseCompSettingSchema.parse({ ...competencyCourseCompSetting, userId: session?.user.id! });
  try {
    const [c] =  await db
     .update(competencyCourseCompSettings)
     .set({...newCompetencyCourseCompSetting, updatedAt: new Date() })
     .where(and(eq(competencyCourseCompSettings.id, competencyCourseCompSettingId!), eq(competencyCourseCompSettings.userId, session?.user.id!)))
     .returning();
    return { competencyCourseCompSetting: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteCompetencyCourseCompSetting = async (id: CompetencyCourseCompSettingId) => {
  const { session } = await getUserAuth();
  const { id: competencyCourseCompSettingId } = competencyCourseCompSettingIdSchema.parse({ id });
  try {
    const [c] =  await db.delete(competencyCourseCompSettings).where(and(eq(competencyCourseCompSettings.id, competencyCourseCompSettingId!), eq(competencyCourseCompSettings.userId, session?.user.id!)))
    .returning();
    return { competencyCourseCompSetting: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

