import { db } from "@soco/competency-db/client";
import { eq, and } from "@soco/competency-db";
import { getUserAuth } from "@soco/auth-service";
import { type CompetencyCourseCompSettingId, competencyCourseCompSettingIdSchema, competencyCourseCompSettings } from "@soco/competency-db/schema/competencyCourseCompSettings";

export const getCompetencyCourseCompSettings = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select().from(competencyCourseCompSettings).where(eq(competencyCourseCompSettings.userId, session?.user.id!));
  const c = rows
  return { competencyCourseCompSettings: c };
};

export const getCompetencyCourseCompSettingById = async (id: CompetencyCourseCompSettingId) => {
  const { session } = await getUserAuth();
  const { id: competencyCourseCompSettingId } = competencyCourseCompSettingIdSchema.parse({ id });
  const [row] = await db.select().from(competencyCourseCompSettings).where(and(eq(competencyCourseCompSettings.id, competencyCourseCompSettingId), eq(competencyCourseCompSettings.userId, session?.user.id!)));
  if (row === undefined) return {};
  const c = row;
  return { competencyCourseCompSetting: c };
};


